var SpeechAPI = (function(){

	var SpeechRecognition = window.SpeechRecognition 
						 || window.webkitSpeechRecognition 
					 	 || null;

	var initialized = false;

	if (SpeechRecognition != null) {
		var recognizer = new SpeechRecognition();

		recognizer.continuous = true;
		recognizer.lang = 'en';

		function init(element) {
			recognizer.onresult = function(event) {
				element.textContent = '';
				for(var i = event.resultIndex; i < event.results.length; i++) {
					if(event.results[i].isFinal) {
						element.textContent = event.results[i][0].transcript;// + ' (Confidence: ' + event.results[i][0].confidence + ')';
					} else {
						element.textContent += event.results[i][0].transcript;
					}
				}
			}

			recognizer.onerror = function(event) {
				console.log('Recognition error: ' + event.message);
			}
		}

		function start() {
			recognizer.interimResults = true;
			try {
				recognizer.start();
				console.log('recognition started');
			}
			catch(ex) {
				console.log('recognition error: ', ex.message);
			}
		}

		function stop() {
			recognizer.stop();
			console.log('Recognition stopped');
		}

	}



	return {
		startRecognition: function(element) {
			if(!initialized) 
				init(element);
			start();
		},
		stopRecognition: function() {
			stop();
		},
		speak: function(lang, text) {
			var msg = new SpeechSynthesisUtterance(text);
			var voices = speechSynthesis.getVoices();
			for( var i in voices ) {
				if (voices[i].lang == lang) {
					msg.voice = voices[i];
					break;
				}
			}
    		speechSynthesis.speak(msg);
		}
	}
}());
