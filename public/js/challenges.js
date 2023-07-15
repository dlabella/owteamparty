class ChallengeManager extends ItemManager {
    constructor() {
        super();
        self = this;
        this.api = "/api/challenges";
    }

    render() {
        // Get the challenge table
        let table = document.getElementById('challengeTable');

        // Add rows for each challenge
        this.getItems().then((items) => {
            table.innerHTML = '<tr><th>Name</th><th>Score</th><th>Action</th></tr>';
            items.forEach(function (challenge, index) {
                let row = self.createRow(challenge);
                table.appendChild(row);
                row.querySelector(".js-edit-row").addEventListener("click", () => self.editItem(index));
                row.querySelector(".js-delete-row").addEventListener("click", () => self.removeItem(index));
            });
        });
    }

    createRow(challenge) {
        const template = "<tr><td>{0}</td><td>{1}</td><td class='actions'>{2}</td></tr>";
        const editButton = getButtonHtml("Edit", "js-edit-row action");
        const deleteButton = getButtonHtml("Delete", "js-delete-row action");
        let row = template.replace("{0}", challenge.name)
            .replace("{1}", challenge.score)
            .replace("{2}", editButton + deleteButton);
        return createHtmlElement(row);
    }

    getItemFromUI() {
        const challengeNameId = document.getElementById('challengeId').value;
        const challengeName = document.getElementById('challengeName').value;
        const challengeScore = parseInt(document.getElementById('challengeScore').value);
        return {
            id: challengeNameId,
            name: challengeName,
            score: challengeScore
        };
    }

    setItemOnUI(item) {
        document.getElementById('challengeId').value=item.id;
        document.getElementById('challengeName').value=item.name;
        document.getElementById('challengeScore').value=item.score;    
    }

    resetItemOnUI() {
        document.getElementById('challengeId').value = '';
        document.getElementById('challengeName').value = '';
        document.getElementById('challengeScore').value = '';
    }

    isValid(item) {
        return (item && item.name && item.name.trim() != "" && item.score && parseInt(item.score) != NaN);
    }

    initialize() {
        const addButton = document.getElementById('add');
        addButton.addEventListener('click', () => this.addItem());

        const updateButton = document.getElementById('update');
        updateButton.addEventListener('click', () => this.saveItem());

        const cancelButton = document.getElementById('cancel');
        cancelButton.addEventListener('click', () => this.cancelEdit());
        this.actions = {
            add: addButton,
            update: updateButton,
            cancel: cancelButton
        };
        this.render();
    }
}

const challengeManager = new ChallengeManager();
