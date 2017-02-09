(function(){
	'use strict';
	
	angular.module('tarefas').config(Confg);
	
	Confg.$inject=["$stateProvider","$urlRouterProvider"];
	
	function Confg($stateProvider,$urlRouterProvider){
		
		$urlRouterProvider.otherwise("/tarefas");
		
		$stateProvider.state("tarefas",{
			abstract:true,
			template:"<ui-view/>"
		})
		.state("tarefas.list",{
			url:"/tarefas",
			templateUrl:"js/tarefa/tarefa-list.html",
			controller:"tarefaListController",
			controllerAs:"controller"
		})
		.state("tarefas.edit",{
			url:"/tarefas/edit/:id",
			templateUrl:"js/tarefa/tarefa-form.html",
			controller:"tarefaFormController",
			controllerAs:"controller"
		})
		.state("tarefas.new",{
			url:"/tarefas/new",
			templateUrl:"js/tarefa/tarefa-form.html",
			controller:"tarefaFormController",
			controllerAs:"controller"
		})
		
	}
})();