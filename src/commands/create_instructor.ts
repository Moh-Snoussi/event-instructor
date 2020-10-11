const chalk = require('chalk');
const clear = require('clear');
const logSymbols = require('log-symbols');
const figlet = require('figlet');
const inquirer = require('inquirer');
const path = require('path')
const fs = require('fs')
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
const _ = require('lodash');
const fuzzy = require('fuzzy');
const dirTree = require("directory-tree");

class CreateInstructor {

    private static tree: Array<string> = []
    private static treeRelative: Object = {}
    private extension: Object = {
        JavaScript: '.js',
        TypeScript: '.ts',
        Flow: '.flow'
    }
    private questions: Array<any> = [
        {
            name: 'name',
            type: 'input',
            message: 'enter the name of the EventInstructor',
            validate: function (value : string) {
                if (value.length) {

                    // @ts-ignore
                    if (value.match(/^[a-zA-Z]*/)[0] !== value) {
                        return 'the provided name is not qualified, please enter an EventInstructor name that has only Latin letters.';
                    }
                    clear();
                    return true;
                } else {
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
    ]

    private defaultQuestions: Array<any> = [
        {
            name: 'default',
            type: 'input',
            message: 'press enter to continue with the previous entered options [directory, language, style], press any other key to change previously entered options',
            default: '',
        },
    ];

    private constantQuestions: Array<any> = [
        {
            type: 'autocomplete',
            name: 'language',
            message: 'which language will you use ?',
            source: CreateInstructor.searchLanguage,
            when: function (data: any): boolean {
                return data.default !== ''
            }
        },
        {
            type: 'autocomplete',
            name: 'style',
            message: 'which language will you use ?',
            source: CreateInstructor.searchStyle,
            when: function (data: any): boolean {
                return data.default !== ''
            }
        },
        {
            type: 'autocomplete',
            name: 'directory',
            message: 'Where should the new files be created ?',
            source: this.searchStates,
            pageSize: 7,
            when: function (data: any): boolean {
                return data.default !== '' || data.default === undefined
            }
        },
    ];

    private setDirectoryOptions(): void {
        const appDir = require('app-root-path').toString()
        dirTree(appDir, {exclude: [/node_modules/, /vendor/, /var/, /cache/, /\.[a-z]/]}, null,
            (item: { path: string; }, PATH: any, stats: any) => {
                const cleanPath = item.path.replace(/\.\.\//g, "");
                // @ts-ignore
                CreateInstructor.treeRelative[cleanPath] = item.path
                CreateInstructor.tree.push(cleanPath)
            });
    }

    public constructor() {
        clear();

        this.setDirectoryOptions();

        console.log(
            chalk.bgBlackBright(
                figlet.textSync('EventInstructor', {horizontalLayout: 'full'})
            )
        );

        this.readCachedData().then(cached => {
            const questions = this.questions
            if (cached.cached) {
                questions.push(...this.defaultQuestions)
            }
            questions.push(...this.constantQuestions)

            inquirer.prompt(questions).then((data: { default?: any; style: any; language: any; directory: any; name?: string; description?: string; }) => {
                if (data.default == '' && data.default !== undefined) {
                    data.style = cached.style
                    data.language = cached.language
                    data.directory = cached.directory
                }
                this.generateFiles(data)
            });
        });
    }


    private async searchStates(answers: any, input: any): Promise<any> {
        return await CreateInstructor.fuzzyFinder(answers, input, CreateInstructor.tree);
    }

    private static async searchLanguage(answers: any, input: any): Promise<any> {
        return await CreateInstructor.fuzzyFinder(answers, input, ['JavaScript', 'JSX', 'TypeScript', 'TSX', 'Flow'])
            ;
    }

    private static async searchStyle(answers: any, input: any): Promise<any> {
        return await CreateInstructor.fuzzyFinder(answers, input, ['nothing', 'css', 'less', 'scss', 'sass'])
            ;
    }

    public static async fuzzyFinder(answers: any, input: string, available: string[]): Promise<any> {
        input = input || '';
        return new Promise(function (resolve) {
            setTimeout(function () {
                var fuzzyResult = fuzzy.filter(input, available);
                const results = fuzzyResult.map(function (el: { original: any; }) {
                    return el.original;
                });
                results.push(new inquirer.Separator());
                resolve(results);
            }, _.random(30, 500));
        })
    }

    /**
     *
     * @param data
     * @private
     */
    private generateFiles(data: { default?: any; style: any; language: any; directory: any; name?: string; description?: string }): void {
        // @ts-ignore
        const nameFirstCapitalize = data.name.charAt(0).toUpperCase() + data.name.slice(1)
        // @ts-ignore
        const inputFile: string = path.normalize(__dirname + path.sep + 'Templates' + path.sep + 'EventInstructor' + (this.extension)[data.language])
        // @ts-ignore
        const outputDirectory: string = path.normalize(CreateInstructor.treeRelative[data.directory] + path.sep + data.name + path.sep)
        // @ts-ignore
        const outputFile = outputDirectory + nameFirstCapitalize + this.extension[data.language]
        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory);
        }

        let styleImport = ''
        let userDefault = false;


        if (data.style !== 'nothing') {

            const inputStyleFile: string = path.normalize(__dirname + path.sep + 'Templates' + path.sep + 'style' + '.' + data.style)
            // @ts-ignore
            const outputStyleFile: string = outputDirectory + data.name.toLowerCase() + '.' + data.style

            // @ts-ignore
            styleImport = 'import "' + data.name.toLowerCase() + '.' + data.style + '"'

            fs.copyFile(inputStyleFile, outputStyleFile, (err: any) => {
                if (err) throw err;
                //Load the library and specify options
                console.log(logSymbols.success + ' ' + data.style + ' File was created to ' + chalk.underline(outputStyleFile));
            });

        }

        fs.copyFile(inputFile, outputFile, (err: any) => {
            if (err) throw err;
            //Load the library and specify options
            const replace = require('replace-in-file');
            const options = {
                files: outputFile,
                from: [/\$NAME\$/g, /\$DESCRIPTION\$/g, /\$STYLE\$/g
                ],
                to: [nameFirstCapitalize, data.description, styleImport],
            };
            replace.sync(options)
            console.log(logSymbols.success + ' ' + data.language + 'File was created to ' + chalk.underline(outputFile));

            // @ts-ignore
            fs.writeFile(__dirname + path.sep + "user_default.json", JSON.stringify(data), function (err) {
                    if (err) throw err;
                    userDefault = true;
                }
            );

            if (userDefault) {
                console.log(logSymbols.success + ' User defaults created, next time you can skip directory, language and style questions');
            }
            console.log(logSymbols.info + ' ' + chalk.underline('Start editing your new instructor then import it from the entry point of your javascript:') + '\n');
            console.log(`${chalk.red('import')} ${chalk.blue.bold('EventManager')} = ${chalk.blue('from')} "event-instructor"`);
            console.log(`${chalk.red('import')} {${chalk.blue.bold(nameFirstCapitalize)}} from "./DirectoryWhere/${nameFirstCapitalize}" ${chalk.gray('// change the directoryWhere')}`);

            console.log(`${chalk.red('const')} ${chalk.blue('eventManager')} = new ${chalk.blue.bold('EventManager')}()`)
            console.log(`\n${chalk.blue('eventManager')}.setSubscribers([ ${chalk.blue.bold(nameFirstCapitalize)}, ${chalk.blue.bold('anotherInstructor')} ]) ${chalk.gray(' // you can subscribe to another Instructor')}`)
        });
    }

    /**
     *
     * returns data that was previously set
     * @private
     */
    private async readCachedData(): Promise<any> {
        const data = {
            cached: false
        };

        return new Promise((resolve, reject) => {
            if (fs.existsSync(__dirname + path.sep + 'user_default.json')) {
                // @ts-ignore
                fs.readFile(__dirname + path.sep + 'user_default.json', 'utf8', function (err, data) {
                    if (err) reject(err)
                    data = JSON.parse(data)
                    data.cached = true
                    resolve(data)
                });
            } else {
                resolve({cached: false})
            }
        })
    }
}


new CreateInstructor();