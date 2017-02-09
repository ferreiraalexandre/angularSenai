(function() {
    'use strict';

    angular.module("tarefas").controller("tarefaFormController", Controller);

    Controller.$inject = ["lowercaseFilter", "tarefasFactory", "toaster"];

    function Controller(lc, tarefasFactory, toaster) {
    	
        var self = this;

        self.tarefa = {};
        self.tarefas = [];

        self.novaTarefa = function() {
            self.tarefa = {};
        };

        self.salvarTarefa = function(tarefa) {
            tarefa.descricao = lc(tarefa.descricao);
            if (tarefa.id) {
                editarTarefa(tarefa);
            } else {
                incluirTarefa(tarefa);
            }
        };

        function incluirTarefa(tarefa) {debugger;
            tarefasFactory.save(tarefa).then(function(result) {
                if (result.data) {
                    self.tarefas.push(result.data);
                    self.novaTarefa();
                    toaster.pop(result.status, 'aviso', result.mensagem);
                }
            }).catch(function(result) {
                toaster.pop(result.status, 'Erro', result.mensagem);
            });
        }

        function editarTarefa(tarefa) {
            tarefasFactory.edit(tarefa.id, tarefa).then(function(result) {
                if (result.data) {
                    var pos = -1;
                    angular.forEach(self.tarefas, function(item, index) {
                        if (tarefa.id == item.id) {
                            pos = index;
                        }
                    });
                    if (pos > -1) {
                        self.tarefas.splice(pos, 1, self.tarefa);
                        self.novaTarefa();
                    }
                    toaster.pop(result.status, 'aviso', result.mensagem);
                }
            }).catch(function(result) {
                toaster.pop(result.status, 'Erro', result.mensagem);
            });
        }

        self.removerTarefa = function(tarefa) {
            tarefasFactory.remove(tarefa.id).then(function(result) {
                if (result.data) {
                    var pos = -1;
                    angular.forEach(self.tarefas, function(item, index) {
                        if (tarefa.id == item.id) {
                            pos = index;
                        }
                    });
                    if (pos > -1) {
                        self.tarefas.splice(pos, 1);
                    }
                    toaster.pop(result.status, 'aviso', result.mensagem);
                }
            }).catch(function(result) {
                toaster.pop(result.status, 'Erro', result.mensagem);
            });


        }

        self.selecionarTarefa = function(tarefa) {
            self.tarefa = angular.copy(tarefa);
        }
    }
})();