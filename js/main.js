var data = {
  'lines': [
    {
      'id': 1,
      'origin': {
        'full': 'Sí, sabes que ya llevo un rato mirándote',
        'wordByWord':{
          'one': 'Sí',
          'two': 'sabes',
          'three': 'que'
        }
      },
      'english': {
        'full': 'Yes, you know that I have been watching you for a while',
        'wordByWord':{
          'one': 'Yes',
          'two': 'You',
          'three': 'know'
        }
      }
    },
    {
      'id': 2,
      'origin': {
        'full': 'Tengo que bailar contigo hoy ',
        'wordByWord':{
          'one': 'Tengo',
          'two': 'que',
          'three': 'bailar'
        }
      },
      'english': {
        'full': 'I have to dance with you today',
        'wordByWord':{
          'one': 'I',
          'two': 'have to',
          'three': 'dance'
        }
      }
    },
    {
      'id': 3,
      'origin': {
        'full': 'Vi que tu mirada ya estaba llamándome ',
        'wordByWord':{
          'one': 'Vi',
          'two': 'que',
          'three': 'tu'
        }
      },
      'english': {
        'full': 'I saw that your look was already calling me',
        'wordByWord':{
          'one': 'I',
          'two': 'saw',
          'three': 'that'
        }
      }
    }
  ]

}

$(function() {
  const model = {
    init () {
      this.lyrics = data ;

      // console.log(this.lyrics.three.origin.full);
      console.log('model initiated');
    }
  };

  const controller = {
    init () {
      model.init();
      view.init();
      console.log('controller initiated');

    }
  };

  const view = {
    init () {
      this.origin = $('#origin-lyrics');
      this.translated = $('#translated-lyrics');
      console.log('view initiated');

    },
    updateOrigin(){
      
    },
    updateTranslated(){

    }
  };

  controller.init();

});
