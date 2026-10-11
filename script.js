/* =========================================================
   SCRIPT DE INTERATIVIDADE E VALIDAÇÃO - PORTFÓLIO
   ========================================================= */

   document.addEventListener("DOMContentLoaded", function () {

    // 1. RELÓGIO E DATA DINÂMICOS NO TOPO
    function atualizarRelogioEData() {
        const elementoClock = document.getElementById("clock");
        const elementoDate = document.getElementById("date");
        
        const agora = new Date();
        
        // Formata a hora (HH:MM)
        const horas = String(agora.getHours()).padStart(2, '0');
        const minutos = String(agora.getMinutes()).padStart(2, '0');
        if (elementoClock) {
            elementoClock.textContent = `${horas}:${minutos}`;
        }

        // Formata a data (DD/MM/AAAA)
        const dia = String(agora.getDate()).padStart(2, '0');
        const mes = String(agora.getMonth() + 1).padStart(2, '0');
        const ano = agora.getFullYear();
        if (elementoDate) {
            elementoDate.textContent = `${dia}/${mes}/${ano}`;
        }
    }
    
    // Executa a função imediatamente e depois atualiza a cada segundo
    atualizarRelogioEData();
    setInterval(atualizarRelogioEData, 1000);


    // 2. NAVEGAÇÃO DINÂMICA DAS ABAS DO MENU (ADICIONAR/REMOVER CLASSE ACTIVE)
    const abasMenu = document.querySelectorAll(".menu .tab");
    
    abasMenu.forEach(aba => {
        aba.addEventListener("click", function () {
            // Remove a classe 'active' de todas as abas
            abasMenu.forEach(item => item.classList.remove("active"));
            // Adiciona a classe 'active' apenas na aba clicada
            this.classList.add("active");
        });
    });


    // 3. VALIDAÇÃO DO FORMULÁRIO DE CONTATO (EXIGÊNCIA DA ATIVIDADE)
    const formulario = document.getElementById("contactForm");
    const mensagemFeedback = document.getElementById("formMessage");

    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault(); // Impede o envio padrão da página

            // Captura e limpa os espaços em branco dos campos
            const nomeInput = document.getElementById("nome").value.trim();
            const emailInput = document.getElementById("email").value.trim();
            const mensagemInput = document.getElementById("mensagem").value.trim();

            // Validação de campos vazios
            if (nomeInput === "" || emailInput === "" || mensagemInput === "") {
                exibirFeedback("Por favor, preencha todos os campos antes de enviar.", "erro");
                return;
            }

            // Validação de formato de e-mail utilizando Expressão Regular (Regex)
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(emailInput)) {
                exibirFeedback("Por favor, insira um endereço de e-mail válido (ex: usuario@dominio.com).", "erro");
                return;
            }

            // Simulação de envio com sucesso e limpeza dos campos
            exibirFeedback("Mensagem enviada com sucesso!", "sucesso");
            formulario.reset();
        });
    }

    // Função auxiliar para exibir mensagens de feedback na tela
    function exibirFeedback(texto, tipo) {
        if (mensagemFeedback) {
            mensagemFeedback.textContent = texto;
            
            if (tipo === "erro") {
                mensagemFeedback.style.color = "#d9534f"; // Vermelho estilo alerta
            } else {
                mensagemFeedback.style.color = "#28a745"; // Verde sucesso
            }
        } else {
            alert(texto);
        }
    }


    // 4. INTERATIVIDADE PARA FECHAR AS JANELAS (BOTÕES "X")
    const botoesFechar = document.querySelectorAll(".window-title button");

    botoesFechar.forEach(botao => {
        botao.addEventListener("click", function () {
            // Localiza a janela pai mais próxima e a esconde temporariamente ao clicar no 'X'
            const janela = this.closest(".social-window, .education-window, .contact-window");
            if (janela) {
                janela.style.display = "none";
            }
        });
    });

});