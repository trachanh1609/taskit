// $(function() {
  const model = {
    init () {


    }
  };

  const controller = {
    init () {
      model.init();
      view.init();
    },
    nextToTaskView() {
      view.goToTaskView();
    },
    backToGroupView() {
      view.goToGroupView();
    }
  };

  const view = {
    init () {
      this.groupView = $('#groupView');
      this.taskView = $('#taskView');
      this.cards = $('.card');

      this.taskView.hide();
      this.addEventToCards();
    },
    goToTaskView(){
      this.groupView.slideUp(400);
      this.taskView.slideDown(400);
    },
    goToGroupView(){
      this.taskView.slideUp(400);
      this.groupView.slideDown(400);
    },
    addEventToCards(){
      let self = this
      self.cards.each(function(){
        $(this).click(function(){
          self.goToTaskView();
        })
      });
    }

  };

  controller.init();

// });
