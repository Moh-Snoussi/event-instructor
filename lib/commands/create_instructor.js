"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var chalk = require('chalk');
var clear = require('clear');
var logSymbols = require('log-symbols');
var figlet = require('figlet');
var inquirer = require('inquirer');
var path = require('path');
var fs = require('fs');
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
var _ = require('lodash');
var fuzzy = require('fuzzy');
var dirTree = require("directory-tree");
var CreateInstructor = /** @class */ (function () {
    function CreateInstructor() {
        var _this = this;
        this.extension = {
            JavaScript: '.js',
            TypeScript: '.ts',
            Flow: '.flow'
        };
        this.questions = [
            {
                name: 'name',
                type: 'input',
                message: 'enter the name of the EventInstructor',
                validate: function (value) {
                    if (value.length) {
                        // @ts-ignore
                        if (value.match(/^[a-zA-Z]*/)[0] !== value) {
                            return 'the provided name is not qualified, please enter an EventInstructor name that has only Latin letters.';
                        }
                        clear();
                        return true;
                    }
                    else {
                        return 'EventInstructor name can not be empty, Please enter a new EventInstructor name.';
                    }
                }
            },
            {
                name: 'description',
                type: 'input',
                message: 'what is the purpose of this class (description is added in the jsDoc)',
                default: ''
            }
        ];
        this.defaultQuestions = [
            {
                name: 'default',
                type: 'input',
                message: 'press enter to continue with the previous entered options [directory, language, style], press any other key to change previously entered options',
                default: '',
            },
        ];
        this.constantQuestions = [
            {
                type: 'autocomplete',
                name: 'language',
                message: 'which language will you use ?',
                source: CreateInstructor.searchLanguage,
                when: function (data) {
                    return data.default !== '';
                }
            },
            {
                type: 'autocomplete',
                name: 'style',
                message: 'which language will you use ?',
                source: CreateInstructor.searchStyle,
                when: function (data) {
                    return data.default !== '';
                }
            },
            {
                type: 'autocomplete',
                name: 'directory',
                message: 'Where should the new files be created ?',
                source: this.searchStates,
                pageSize: 7,
                when: function (data) {
                    return data.default !== '' || data.default === undefined;
                }
            },
        ];
        clear();
        this.setDirectoryOptions();
        console.log(chalk.bgBlackBright(figlet.textSync('EventInstructor', { horizontalLayout: 'full' })));
        this.readCachedData().then(function (cached) {
            var questions = _this.questions;
            if (cached.cached) {
                questions.push.apply(questions, _this.defaultQuestions);
            }
            questions.push.apply(questions, _this.constantQuestions);
            inquirer.prompt(questions).then(function (data) {
                if (data.default == '' && data.default !== undefined) {
                    data.style = cached.style;
                    data.language = cached.language;
                    data.directory = cached.directory;
                }
                _this.generateFiles(data);
            });
        });
    }
    CreateInstructor.prototype.setDirectoryOptions = function () {
        var appDir = require('app-root-path').toString();
        dirTree(appDir, { exclude: [/node_modules/, /vendor/, /var/, /cache/, /\.[a-z]/] }, null, function (item, PATH, stats) {
            var cleanPath = item.path.replace(/\.\.\//g, "");
            // @ts-ignore
            CreateInstructor.treeRelative[cleanPath] = item.path;
            CreateInstructor.tree.push(cleanPath);
        });
    };
    CreateInstructor.prototype.searchStates = function (answers, input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CreateInstructor.fuzzyFinder(answers, input, CreateInstructor.tree)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CreateInstructor.searchLanguage = function (answers, input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CreateInstructor.fuzzyFinder(answers, input, ['JavaScript', 'JSX', 'TypeScript', 'TSX', 'Flow'])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CreateInstructor.searchStyle = function (answers, input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CreateInstructor.fuzzyFinder(answers, input, ['nothing', 'css', 'less', 'scss', 'sass'])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CreateInstructor.fuzzyFinder = function (answers, input, available) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                input = input || '';
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            var fuzzyResult = fuzzy.filter(input, available);
                            var results = fuzzyResult.map(function (el) {
                                return el.original;
                            });
                            results.push(new inquirer.Separator());
                            resolve(results);
                        }, _.random(30, 500));
                    })];
            });
        });
    };
    /**
     *
     * @param data
     * @private
     */
    CreateInstructor.prototype.generateFiles = function (data) {
        // @ts-ignore
        var nameFirstCapitalize = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        // @ts-ignore
        var inputFile = path.normalize(__dirname + path.sep + 'Templates' + path.sep + 'EventInstructor' + (this.extension)[data.language]);
        // @ts-ignore
        var outputDirectory = path.normalize(CreateInstructor.treeRelative[data.directory] + path.sep + data.name + path.sep);
        // @ts-ignore
        var outputFile = outputDirectory + nameFirstCapitalize + this.extension[data.language];
        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory);
        }
        var styleImport = '';
        var userDefault = false;
        if (data.style !== 'nothing') {
            var inputStyleFile = path.normalize(__dirname + path.sep + 'Templates' + path.sep + 'style' + '.' + data.style);
            // @ts-ignore
            var outputStyleFile_1 = outputDirectory + data.name.toLowerCase() + '.' + data.style;
            // @ts-ignore
            styleImport = 'import "' + data.name.toLowerCase() + '.' + data.style + '"';
            fs.copyFile(inputStyleFile, outputStyleFile_1, function (err) {
                if (err)
                    throw err;
                //Load the library and specify options
                console.log(logSymbols.success + ' ' + data.style + ' File was created to ' + chalk.underline(outputStyleFile_1));
            });
        }
        fs.copyFile(inputFile, outputFile, function (err) {
            if (err)
                throw err;
            //Load the library and specify options
            var replace = require('replace-in-file');
            var options = {
                files: outputFile,
                from: [/\$NAME\$/g, /\$DESCRIPTION\$/g, /\$STYLE\$/g
                ],
                to: [nameFirstCapitalize, data.description, styleImport],
            };
            replace.sync(options);
            console.log(logSymbols.success + ' ' + data.language + 'File was created to ' + chalk.underline(outputFile));
            // @ts-ignore
            fs.writeFile(__dirname + path.sep + "user_default.json", JSON.stringify(data), function (err) {
                if (err)
                    throw err;
                userDefault = true;
            });
            if (userDefault) {
                console.log(logSymbols.success + ' User defaults created, next time you can skip directory, language and style questions');
            }
            console.log(logSymbols.info + ' ' + chalk.underline('Start editing your new instructor then import it from the entry point of your javascript:') + '\n');
            console.log(chalk.red('const') + " {" + chalk.blue.bold('EventManager') + "} = " + chalk.blue('require') + "( \"event-instructor\" )");
            console.log(chalk.red('import') + " {" + chalk.blue.bold(nameFirstCapitalize) + "} from \"./DirectoryWhere/" + nameFirstCapitalize + "\" " + chalk.gray('// change the directoryWhere'));
            console.log(chalk.red('const') + " " + chalk.blue('eventManager') + " = new " + chalk.blue.bold('EventManager') + "()");
            console.log("\n" + chalk.blue('eventManager') + ".setSubscribers([ " + chalk.blue.bold(nameFirstCapitalize) + ", " + chalk.blue.bold('anotherInstructor') + " ]) " + chalk.gray(' // you can subscribe to another Instructor'));
        });
    };
    /**
     *
     * returns data that was previously set
     * @private
     */
    CreateInstructor.prototype.readCachedData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = {
                    cached: false
                };
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (fs.existsSync(__dirname + path.sep + 'user_default.json')) {
                            // @ts-ignore
                            fs.readFile(__dirname + path.sep + 'user_default.json', 'utf8', function (err, data) {
                                if (err)
                                    reject(err);
                                data = JSON.parse(data);
                                data.cached = true;
                                resolve(data);
                            });
                        }
                        else {
                            resolve({ cached: false });
                        }
                    })];
            });
        });
    };
    CreateInstructor.tree = [];
    CreateInstructor.treeRelative = {};
    return CreateInstructor;
}());
new CreateInstructor();
//# sourceMappingURL=create_instructor.js.map