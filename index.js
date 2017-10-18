const Transports        = require('./transports');
const pjson             = require('./package.json');
const wpRepository      = 'https://themes.svn.wordpress.org';


class CheckWordPressThemeAvailable {

    constructor() {
        let argv = process.argv.slice();
        argv.splice(0, 2);

        switch (argv[0]) {

            case new RegExp('^-(v||version)$', 'i').test(argv[0]) && argv[0]:
                console.log('awptn version', pjson.version);
                break;

            case new RegExp('^-(h||help)$', 'i').test(argv[0]) && argv[0]:
                console.log('Examples:');
                console.log('awptn wp-theme-name');
                console.log('awptn dark-dragonfly');

                console.log('Commands: ');
                console.log('[-h] or [-help]');
                console.log('Example:');
                console.log('awptn -h');
                console.log('[-v] or [-version]');
                console.log('Example:');
                console.log('awptn -v');


                break;

            default:
                if (argv[0]) {
                    this.check(argv[0]);
                } else {
                    console.log('Theme name is required parameter');
                }
        }
    }

    check(themeName) {
        Transports.fetch({url: `${wpRepository}/${themeName}/`})
            .then((result)=> {
                if (result.statusCode !== 404) {
                    console.log(`Theme with the name ${themeName} already exists!`);
                } else {
                    console.log(`Congratulations! ${themeName} theme name is available!`);
                }
            });
    }

}

new CheckWordPressThemeAvailable();