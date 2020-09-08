declare const chalk: any;
declare const clear: any;
declare const logSymbols: any;
declare const figlet: any;
declare const inquirer: any;
declare const path: any;
declare const fs: any;
declare const _: any;
declare const fuzzy: any;
declare const dirTree: any;
declare class CreateInstructor {
    private static tree;
    private static treeRelative;
    private extension;
    private questions;
    private defaultQuestions;
    private constantQuestions;
    private setDirectoryOptions;
    constructor();
    private searchStates;
    private static searchLanguage;
    private static searchStyle;
    static fuzzyFinder(answers: any, input: string, available: string[]): Promise<any>;
    /**
     *
     * @param data
     * @private
     */
    private generateFiles;
    /**
     *
     * returns data that was previously set
     * @private
     */
    private readCachedData;
}
//# sourceMappingURL=create_instructor.d.ts.map