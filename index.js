document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button_item');
    const sections = document.querySelectorAll('.form-section');

    // Função para esconder todas as seções
    function hideAllSections() {
        sections.forEach(section => {
            section.style.display = 'none';
        });
    }

    // Adiciona evento de clique para cada botão de navegação
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                if (targetSection.style.display === 'none' || targetSection.style.display === '') {
                    hideAllSections(); // Esconde todas as seções antes de mostrar a desejada
                    targetSection.style.display = 'block';
                } else {
                    targetSection.style.display = 'none';
                }
            }
        });
    });

    // Função para ajustar a altura do textarea automaticamente
    function autoResizeTextarea() {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        });
    }

    // Função para gerar e exibir os resultados formatados
    function generateResults() {
        const who = document.getElementById('who').value;
        const what = document.getElementById('what').value;
        const why = document.getElementById('why').value;
        const description = document.getElementById('description').value;
        const objective = document.getElementById('objective').value;
        const requirements = document.getElementById('requirements').value;
        const knowledge = document.getElementById('knowledge').value;

        // Coleta os dados dos textareas adicionais
        const extraDescriptions = document.querySelectorAll('#story_description textarea[name="story_description_extra"]');
        let extraDescriptionText = '';
        extraDescriptions.forEach((textarea, index) => {
            extraDescriptionText += `\n{code}\n${textarea.value}\n{code}`;
        });

        const extraObjectives = document.querySelectorAll('#story_objective textarea[name="story_objective_extra"]');
        let extraObjectiveText = '';
        extraObjectives.forEach((textarea, index) => {
            extraObjectiveText += `\n{code}\n${textarea.value}\n{code}`;
        });
//{code:txt|title=CNT.ACI.MZ.BHD2.IACISIBC.D241231.RRES4088.XML|borderStyle=solid}
        const extraRequirements = document.querySelectorAll('#story_requirements textarea[name="story_requirements_extra"]');
        let extraRequirementText = '';
        extraRequirements.forEach((textarea, index) => {
            extraRequirementText += `\n{code}\n${textarea.value}\n{code}`;
        });

        // Formata os dados conforme especificado
        const formattedData = `
h2. *User Story*
 * *Eu como:* ${who}
 * *Quero:* ${what}
 * *Para:* ${why}

h2. *Descrição*
${description}${extraDescriptionText}

h2. *Objetivo*
${objective}${extraObjectiveText}

h2. *Requisitos*
${requirements}${extraRequirementText}

----
h3. (i) *Link para acesso ao Confluence:* ${knowledge}
        `;

        // Exibe os dados formatados na div de resultados
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = formattedData;
    }

    // Adiciona o evento de entrada para ajustar a altura enquanto digita
    document.addEventListener('input', function(event) {
        if (event.target.tagName.toLowerCase() === 'textarea' || event.target.tagName.toLowerCase() === 'input') {
            autoResizeTextarea();
            generateResults(); // Gera e exibe os resultados automaticamente
        }
    });

    // Adiciona evento de clique para adicionar novos textareas
    const codeButtons = document.querySelectorAll('.button_code');
    codeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = button.closest('.form-section');
            const newTextarea = document.createElement('textarea');
            newTextarea.name = section.id + '_extra';
            newTextarea.placeholder = 'Digite aqui...';
            section.appendChild(newTextarea);
            autoResizeTextarea(); // Ajusta a altura do novo textarea
            generateResults(); // Gera e exibe os resultados automaticamente
        });
    });

    // Ajusta a altura quando a página carrega
    autoResizeTextarea();
    hideAllSections(); // Esconde todas as seções inicialmente
});