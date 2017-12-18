// main javascript file for the helpdesk Turing test application
var helped = 'You:';
var helper = 'Helpdesk:';
var answer = 'I need more information.';
var qCounter = 0;
var askedQuestion = false;
var wordsList = ['hello'];
var msgCount = 1;

function displayMessage(entry, chatLogId, usrClass, readableUsrName) {
  msgCount++;
  var chatLogElem = document.getElementById(chatLogId);
  
  var logEntryDiv = document.createElement('div');
  logEntryDiv.className = usrClass;
  
  var usrName = document.createElement('p');
  usrName.className = 'chat-log-user';
  var usrNameText = document.createTextNode('Msg' + msgCount + '. ' + readableUsrName);
  usrName.appendChild(usrNameText);
  
  var usrMessage = document.createElement('p');
  usrMessage.className = 'chat-text';
  var usrMessageText = document.createTextNode(entry);
  usrMessage.appendChild(usrMessageText);
  
  logEntryDiv.appendChild(usrName);
  logEntryDiv.appendChild(usrMessage);
  chatLogElem.appendChild(logEntryDiv);
}

function checkQuestion(input) {  
  var niceAsk = ["Can you try restating that as a question, please.","I'm a little confused. Can you try explaining your question a different way?","Ok, maybe if you restate that as a question I can help you a bit better"];
  var normalAsk = ["This is a helpdesk, not a chat board. Ask a question, please.","This isn't a chat board. Ask your question.","This isnt a chatboard. Ask a question or leave.","I have a whole que of people behind you. Please ask your question so I can get on with my work.","Ok, seriously, ask your question already. I'm paid to help you, not listen to you talk all day."];

  if (!askedQuestion) {
    if (!input.includes('?')) {
      if (qCounter < 3) {
        answer = niceAsk[Math.floor(Math.random() * 3)];
        qCounter++;
        return false;
      } else {
        answer = normalAsk[Math.floor(Math.random() * normalAsk.length)];
        qCounter++;
        return false;
      }
    } else {
      askedQuestion = true;
      return true;
    }
  } else {
    return true;
  }
}
function checkKeywords(input) {
  var keywords = [" computer"," Computer"," Phone"," phone"," Cellphone"," cellphone"," WiFi"," WIFI"," WI-FI"," wifi"," Wifi"," wi-fi"," internet"," Internet"," website"," Website"," Software"," software"," program"," Program"," app "," App "," ap "," aps "," apps ", " Apps "," app."," app,"," app?"," ap."," ap,"," ap?"," apps."," apps,"," apps?"," application"," Application", " aplication"," Aplication"," applications"," Applications"," aplications"," Aplications"," screen"," Screen "," monitor "," Monitor"," Keyboard"," keyboard"," mouse"," Mouse"];
  var responses = [["Ok, tell me more about your",""],["So what seems to be the problem with your",""],["Hm, what year was the"," made?"],["That sounds like a problem. Have you tried turning off or disconnecting your"," and then reconnecting it?"]["Have you tried turning off or disconnecting your"," and reconnecting it."],["Have you disconected and reconnected your ",""]];
  var bool = true;
  var indexForKeywords = Math.ceil(Math.random() * responses.length) - 1;
  
  keywords.forEach(function(word) {
    if (input.includes(word)) {
      wordsList.push(word);
      bool = false;
    }
  });
  
  if (wordsList[wordsList.length - 1] !== 'hello') {
    answer = responses[indexForKeywords][0] + wordsList[wordsList.length - 1] + responses[indexForKeywords][1];
  }
   
  return bool;
}

function ifAllElseFails() {
  var responses = ["Ok, thats a little vague. Can you give me some more information?","Ok, so what is your issue exactly?","Ok, so what exactly is the priblem?","Sorry, I don't think I understand the problem","Ok, can you explain with a bit more detail?"];

  answer = responses[Math.floor(Math.random() * responses.length)];
  return true;
}

function respond(entry) {
  var responceTimer = 80;  // should be set to 60+. Shorter time is used during testing
  
  ifAllElseFails();
  checkKeywords(entry);
  checkQuestion(entry);
  
  window.setTimeout(function() {displayMessage(answer,'chatLog','chat-entry-help',helper);},answer.length * responceTimer);
}

function newUsrMessage() {
  var entry = document.getElementById('inputBox').value;
  displayMessage(entry,'chatLog','chat-entry-usr',helped);
  document.getElementById('inputBox').value = '';
  respond(entry);
  return true;
}

function help() {
  alert('If this website crashes simply refresh for a new help session.');
}

function about() {
  alert('This is a web development programming exercise demonstrating a simple chatterbot built with javascript over the course of a weekend. I hope you enjoy it but I doubt you will find it at all helpful. You can find the sourcecode at the github repository at: https://github.com/NixRaven/TuringHelpdesk');
}
