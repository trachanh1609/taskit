// $(function() {
  const model = {
    init () {
      this.currentPrice = 10 ;

    },
    bid() {
      this.currentPrice = this.currentPrice * 1.5 ;
    },
    getCurrentPrice(){
      return this.currentPrice;
    }
  };

  const controller = {
    init () {
      model.init();
      view.init();
      this.updatePrice();
    },
    nextToTaskView() {
      view.goToTaskView();
    },
    backToGroupView() {
      view.goToGroupView();
    },
    bidPrice() {
      model.bid();
      view.updatePrice(model.getCurrentPrice());
    },
    updatePrice(){
      view.updatePrice(model.getCurrentPrice());
    },
    takeTheTask() {
      console.log('task is taken')
    }
  };

  const view = {
    init () {
      this.groupView = $('#groupView');
      this.taskView = $('#taskView');
      this.chartView = $('#chartView');
      this.cards = $('.card');
      this.bidPrice = $('#bidPrice');

      this.taskView.hide();
      this.chartView.hide();
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
    },
    updatePrice(newPrice) {
      this.bidPrice.html(newPrice);
    }

  };

  controller.init();

// });
