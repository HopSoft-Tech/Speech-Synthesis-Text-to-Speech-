const voiceSelect = document.getElementById("voice-select");

// The speech synthesis API is a JavaScript API that allows you to create speech synthesis objects and use them to speak text.
const synth = window.speechSynthesis;
let voices;

function addVoicesToSelect() {
  // gets the voices from the speech synthesis engine.
  voices = synth.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} - ${voices[i].lang}`;

    // Checks for the Default Voice in the Array and Adds the Text "- DEFAULT" to the option.
    if (voices[i].default) {
      option.textContent += " - DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);

    // Add the option to the select element.
    voiceSelect.appendChild(option);
  }
}

function onSubmit(e) {
  e.preventDefault();
  const textInput = document.getElementById("text-input");

  const utterThis = new SpeechSynthesisUtterance(textInput.value);

  // console.log(voiceSelect.selectedOptions[0]);

  // This retrieves the name of the voice selected by the user from the voiceSelect dropdown.
  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute("data-name");

  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  // Passes the utterance to the speech synthesis engine.
  synth.speak(utterThis);
}

// calls addVoicesToSelect() to populate the voice selection dropdown with available voices when the page loads.
addVoicesToSelect();

// This checks if the onvoiceschanged event is supported by the synth object. If it is, it assigns the addVoicesToSelect function to this event. This ensures the voices are refreshed whenever the list of available voices changes (e.g., when new voices are loaded).

if (synth.onvoiceschanged !== undefined)
  synth.onvoiceschanged = addVoicesToSelect;

document.getElementById("form").addEventListener("click", onSubmit);
