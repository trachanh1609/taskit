const model = {
  init() {
    this.currentPrice = 5;

  },
  bid() {
    this.currentPrice = this.currentPrice + 2.5;
  },
  getCurrentPrice() {
    return this.currentPrice;
  }
};

const controller = {
  init() {
    model.init();
    view.init();
    this.updatePrice();
  },
  // nextFromGroupToTask() {
  //   view.groupView.slideUp(400); // slideUp = hide
  //   view.taskView.slideDown(400); // slideDown = show
  // },
  nextFromTaskToChart() {
    view.taskView.slideUp(400);
    view.chartView.slideDown(400);
  },
  backFromTaskToGroup() {
    view.taskView.slideUp(400);
    view.groupView.slideDown(400);
  },
  backFromChartToTask() {
    view.chartView.slideUp(400);
    view.taskView.slideDown(400);
  },
  bidPrice() {
    model.bid();
    view.updatePrice(model.getCurrentPrice());
  },
  updatePrice() {
    view.updatePrice(model.getCurrentPrice());
  },
  takeTheTask() {
    console.log('task is taken')
  }
};

const view = {
  init() {
    this.origin = $('#origin-lyrics');
    this.translated = $('#translated-lyrics');
    this.groupView = $('#groupView');
    this.taskView = $('#taskView');
    this.chartView = $('#chartView');
    this.cards = $('.card');
    this.bidPrice = $('#currentBidPrice');

    this.groupView.hide();
    this.chartView.hide();
    this.addEventToCards();
  },
  goToTaskView() {
    this.groupView.slideUp(400);
    this.taskView.slideDown(400);
  },
  goToGroupView() {
    this.taskView.slideUp(400);
    this.groupView.slideDown(400);
  },
  goToChartView() {
    this.taskView.slideUp(400);
    this.chartView.slideDown(400);
  },
  addEventToCards() {
    let self = this
    self.cards.each(function () {
      $(this).click(function () {
        self.goToTaskView();
      })
    });
  },
  updatePrice(newPrice) {
    this.bidPrice.html(newPrice);
  }

};

$(document).ready(function () {
  $('.modal').modal();
  $('select').material_select();
  controller.init();
})

function addTask() {

  var taskRepeat = $('#taskRepeat').find('option:selected').html();
  var taskTag = $('#taskTag').find('option:selected').html();

  var content = '<li class="collection-item avatar dismissable">' +
    '<i class="material-icons circle ' + taskColor + '">' + taskType + '</i>' +
    '<span class="title">' + $('#taskName').val() + '</span>';

  if (taskRepeat != "Repeat") {
    content += '<p>' + taskRepeat + '</p>';
  }

  content += '<p>' +
    +$('#taskReward').val() + ' EUR' +
    '</p>';

  if (taskTag != "Tag Person") {
    content += '<div class="chip">' +
      '<img src="images/' + taskTag + '.jpg" alt="Contact Person"> ' + taskTag +
      ' </div>';
  }

  content += '<a href="#!" class="secondary-content">' +
    '  <p>' +
    '    <input type="checkbox" id="blank_label4" />' +
    '   <label for="blank_label4"></label>' +
    ' </p>' +
    '</a>' +
    '</li>';
  console.log(content);
  $('ul#taskList').prepend(content);
  $('#modal1').modal('close');
}

function addExpense(descr, amount) {

  var content = `<li class="collection-item avatar dismissable">
  <i class="material-icons circle green darken-2">account_balance</i>
  <span class="title">'${descr}'</span>
  <p>
  <div class="chip">
      <img src="images/jan.jpg" alt="Contact Person"> Jan
    </div>
  </p>
  <a href="#!" class="secondary-content">
    <p>
    '${amount}'
    </p>
  </a>
</li>`;

  $('ul#expensesList').prepend(content);
  $('#modalAccount').modal('close');

}