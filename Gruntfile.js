module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: ['assets/zappi-icons/compressed', 'app/assets/zappi-icons', 'assets/images/zappi-icons','assets/common/compressed', 'app/assets/common', 'assets/images/common'],
    svgmin: { //minimize SVG files
        options: {
            plugins: [
                { removeViewBox: false },
                { removeUselessStrokeAndFill: false }
            ]
        },
        zappi: {
            expand: true,
            cwd: 'assets/zappi-icons/raw',
            src: ['*.svg'],
            dest: 'assets/zappi-icons/compressed',
            ext: '.colors-zappiblue-zappigrey-zappired-zappiorange-zappipurple-zappiyellow-mwb-pg-samsung-pg-mondelize-pepsico-att-unilever-mondelez-cocacola-google-brainjuicer.svg'
        },
        common: {
            expand: true,
            cwd: 'assets/common/raw',
            src: ['*.svg'],
            dest: 'assets/common/compressed',
            ext: '.svg'
        }
    },
    grunticon: { //makes SVG icons into a CSS file
        zappi_icons: {
            files: [{
                expand: true,
                cwd: 'assets/zappi-icons/compressed',
                src: ['*.svg'],
                dest: 'app/assets/stylesheets/zappi-icons'
            }],
            options: {
                cssprefix: '.zappi-',
                colors: {
                    zappiblue: '#0da8df',
                    zappigrey: '#f8f8f8',
                    zappired: '#dc3946',
                    zappiorange: '#f37321',
                    zappipurple: '#b23594',
                    zappiyellow: '#edd216',
                    mwb: '#3e6b7b',
                    pg: '#0046ad',
                    samsung: '#1428a0',
                    mondelez: '#4f2170',
                    pepsico: '#4f76c0',
                    att: '#067ab4',
                    unilever: '#007dbb',
                    cocacola: '#f40009',
                    google: '#4d90fe',
                    brainjuicer: '#D61B0B'
                },
                datasvgcss: "zappi-icons.svg.css",
                datapngcss: "zappi-icons.png.css",
                urlpngcss: "zappi-icons.fallback.css",
                pngfolder: "../../images/zappi-icons",
                pngpath: "/assets/images/zappi-icons",
                defaultWidth: "400px",
                defaultHeight: "400px",
            }
        },
        common: {
            files: [{
                expand: true,
                cwd: 'assets/common/compressed',
                src: ['*.svg'],
                dest: 'app/assets/stylesheets/common'
            }],
            options: {
                cssprefix: '.common-artwork-',
                datasvgcss: "common-artwork.svg.css",
                datapngcss: "common-artwork.png.css",
                urlpngcss: "common-artwork.fallback.css",
                pngfolder: "../../images/common",
                pngpath: "/assets/images/common",
                defaultWidth: "400px",
                defaultHeight: "400px"
            }
        }
    },
    sass: {
        options: {
            sourceMap: false
        },
        dist: {
            files: {
                'dist/stylesheets/zappi-styles/forms.css': 'sass/zappi-styles/forms.scss',
                'dist/stylesheets/zappi-styles/page.css': 'sass/zappi-styles/page.scss'
            }
        },
        local_forms: {
            files: {
                'app/assets/stylesheets/zappi-styles/forms.css': 'sass/zappi-styles/forms.scss'
            }
        },
        local_fluid: {
            files: {
                'app/assets/stylesheets/zappi-styles/fluid.css': 'sass/zappi-styles/fluid.scss',
            }
        },
        local_wp: {
            files: {
                'app/assets/stylesheets/zappi-styles/wp.css': 'sass/zappi-styles/wp.scss'
            }
        },
        local_datacollector: {
            files: {
                'app/assets/stylesheets/zappi-styles/datacollector.css': 'sass/zappi-styles/datacollector.scss'
            }
        },
        local_page: {
          files: {
            'app/assets/stylesheets/zappi-styles/page.css': 'sass/zappi-styles/page.scss'
          }
        }
    },
    watch: {
      page: {
        files: ['sass/zappi-styles/page.scss','sass/zappi-styles/new-layout/**/*.scss'],
        tasks: ['sass:local_page','sass:local_wp']
      },
      wordpress: {
        files: ['sass/zappi-styles/wp.scss','sass/zappi-styles/zappi-wp/**/*.scss','sass/zappi-styles/zappi-wp/widgets/**/*.scss'],
        tasks: ['sass:local_wp']
      },
      fluid: {
        files: ['sass/zappi-styles/fluid.scss','sass/zappi-styles/fluid/**/*.scss','sass/zappi-styles/partials/**/*.scss'],
        tasks: ['sass:local_fluid']
      },
      datacollector: {
        files: ['sass/zappi-styles/datacollector.scss','sass/zappi-styles/data-collector/**/*.scss','sass/zappi-styles/partials/**/*.scss'],
        tasks: ['sass:local_datacollector']
      },
      forms: {
        files: ['sass/zappi-styles/forms.scss','sass/zappi-styles/partials/**/*.scss'],
        tasks: ['sass:local_forms','sass:local_wp']
      },
      icons: {
        files: ['assets/zappi-icons/raw/**/*.svg'],
        tasks: ['grunticon:zappi_icons']
      }
    }
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('compileZappiSass', ['sass:local_page', 'sass:local_wp', 'sass:local_forms']);
  grunt.registerTask('compileDataCollectorSass', ['sass:local_datacollector']);
  grunt.registerTask('icons', ['clean', 'svgmin', 'grunticon']);
  grunt.registerTask('icons_common', ['clean', 'svgmin:common', 'grunticon:common']);

};
