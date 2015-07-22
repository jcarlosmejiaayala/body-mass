(function () {
  'use strict';

  angular
    .module('bodyMass')
    .controller('MainController', [controller]);

  function controller() {
    this.calculate  = function(){
      this.bmi  = this.weight / Math.pow(this.height / 100, 2);
      this.legend = (this.bmi < 16) ? 'Underweight' : (this.bmi > 40) ? 'Overweight': 'Normal'
    };
  }

})();
