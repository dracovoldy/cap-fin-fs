module.exports = function(config) {
	"use strict";

	config.set({

		frameworks: ["ui5"],

		preprocessors: {
			"{webapp,webapp/!(*test|*Service|*utils)}/!(*Custom.js|*server).js/!(*Component).js": ["coverage"]
		},
		
		mochaReporter: {
      		colors: {
    	    success: 'blue',
        	info: 'bgGreen',
        	warning: 'cyan',
        	error: 'bgRed'
    		},
    		symbols: {
        	success: '+',
        	info: '#',
        	warning: '!',
        	error: 'x'
      		}
		},

		coverageReporter: {
			includeAllSources: true,
  			reporters: [ 
				{ 
					type: 'cobertura',
					dir : 'coverage',
					file: 'coverage-cobertura.xml'

				},
				{
					type: "html",
					dir: "coverage"
				},
				{
					type: "text"
				}
	
			],
			check: {
				global: {
					statements: 70,
					branches: 65,
					functions: 70,
					lines: 70
				}
			}
		},
		
		junitReporter: {
        		outputDir: '.',
        		outputFile: 'test-results.xml',
        		suite: '',
				useBrowserName: false
    		},

		trxReporter: {
      			outputFile: 'test-results.trx',
      			shortTestName: true
    		},

		reporters: ["progress", "verbose", "mocha", "coverage", "junit", "trx"],

		browsers: ["ChromeHeadless"],

		singleRun: true
			});
};