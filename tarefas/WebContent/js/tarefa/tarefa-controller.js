(function(){
	'use strict';
	
	angular.module("tarefas").controller("TarefaController",Controller);
	
	Controller.$inject = ["lowercaseFilter","tarefaFactory"];
	
	function Controller(lc,tarefaFactory){
		var self = this;
		
		self.tarefa = {};
		
		self.tarefas = [];
		
		self.pesquisa = "";
		
		self.novaTarefa = function(){
			self.tarefa = {};
		};
		
		self.salvarTarefa = function(tarefa){
			tarefa.descricao = lc(tarefa.descricao);
			if(tarefa.id){
				editarTarefa(tarefa);
			} else{
				incluirTarefa(tarefa);
			}
		};
		
		function incluirTarefa(tarefa){
			tarefa.id = new Date().getTime();
			self.tarefas.push(tarefa);
			self.novaTarefa();
		}
		
		function editarTarefa(tarefa){
			var pos = -1;
			angular.forEach(self.tarefas,function(item,index){
				if(tarefa.id == item.id){
					pos = index;
				}
			});
			if(pos > -1){
				self.tarefas.splice(pos,1,self.tarefa);
				self.novaTarefa();
			}
		}
		
		self.removerTarefa = function(tarefa){
			var pos = -1;
			angular.forEach(self.tarefas,function(item,index){
				if(tarefa.id == item.id){
					pos = index;
				}
			});
			if(pos > -1){
				self.tarefas.splice(pos,1);
			}
		}
		
		self.selecionarTarefa = function(tarefa){
			self.tarefa = angular.copy(tarefa);
		}
	}
})();