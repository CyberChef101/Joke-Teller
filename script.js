const button = document.getElementById('button');
const audioElemnt =document.getElementById('audio');

let joke = '';


//disabled/enabled button
function toggleButton() {
    button.disabled = !button.disabled;
}


//passing a joke to VoiceRSS function
function tellMe() {
    console.log('tell me :',joke);
    VoiceRSS.speech({
        key: 'da20ac5f63b14aa394e2c1ad51c147d1',
        src: joke ,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
     });
}


// get jokes from joke api

async function getJokes() {
   
    const apiUrl ='https://v2.jokeapi.dev/joke/Any';
    try{
     const response = await fetch(apiUrl);
     const data =await response.json();
     if (data.setup) {
        joke = `${data.setup} ... ${data.delivery}`;
     } else {
        joke = data.joke;
     }
     //text-to-speech
     tellMe(joke);
    //disable button
    toggleButton();
    } catch (error) {
        //catch error here
        console.log('whooops Something Went Wrong...!',error)
    }
}

// Event listners
button.addEventListener('click' ,getJokes);
audioElemnt.addEventListener('ended' , toggleButton)