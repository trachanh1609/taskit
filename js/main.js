$(function() {
  const model = {
    init () {
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
      console.log('view initiated');

    }
  };

  controller.init();

});
