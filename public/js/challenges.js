class ChallengeManager extends ItemManager {
    constructor() {
        super();
        self = this;
    }

    render() {
        // Get the challenge table
        let table = document.getElementById('challengeTable');
        table.innerHTML = '<tr><th>Name</th><th>Score</th><th>Actions</th></tr>';

        // Add rows for each challenge
        this.items.forEach(function (challenge, index) {
            let row = self.createRow(challenge);
            table.appendChild(row);
            row.querySelector(".js-edit-row").addEventListener("click", () => self.editChallenge(index));
            row.querySelector(".js-delete-row").addEventListener("click", () => self.deleteChallenge(index));
        });
    }

    createRow(challenge) {
        const template = "<tr><td>{0}</td><td>{1}</td><td class='actions'>{2}</td></tr>";
        const editButton = getButtonHtml("Edit", "js-edit-row action");
        const deleteButton = getButtonHtml("Delete", "js-delete-row action");
        let row = template
            .replace("{0}", challenge.name)
            .replace("{1}", challenge.score)
            .replace("{2}", editButton + deleteButton);
        return createHtmlElement(row);
    }

    getChallengeFromUI() {
        const challengeName = document.getElementById('challengeName').value;
        const challengeScore = document.getElementById('challengeScore').value.split(',');
        return {
            name: challengeName,
            score: challengeScore
        };
    }

    resetChallengeFromUI() {
        document.getElementById('challengeName').value = '';
        document.getElementById('challengeScore').value = '';
    }

    addChallenge() {
        let challenge = this.getChallengeFromUI();
        if (!this.isValidChallenge(challenge)) {
            alert("Challenge must have a name and score!");
            return;
        }
        this.addItem(challenge);
        this.resetChallengeFromUI();
    }
    isValidChallenge(challenge) {
        return (challenge && challenge.name && challenge.name.trim() != "" && challenge.score && challenge.score.length > 0 && challenge.score[0] != "");
    }
    updateChallenge() {
        let challenge = this.getChallengeFromUI();
        if (!this.isValidChallenge(challenge)) {
            alert("Challenge must have a name and score!");
            return;
        }
        this.updateItem(challengeManager.editingIndex, challenge);
        showElement(this.actions.add);
        this.actions.update.disabled = true;
        this.actions.cancel.disabled = true;
        this.resetChallengeFromUI();
    }

    editChallenge(index) {
        const challenge = this.items[index];
        document.getElementById('challengeName').value = challenge.name;
        document.getElementById('challengeScore').value = challenge.score.join(', ');
        hideElement(this.actions.add);
        this.actions.update.disabled = false;
        this.actions.cancel.disabled = false;
        this.editingIndex = index;
    }

    cancelEdit() {
        this.editingIndex = -1;
        this.actions.update.disabled = true;
        this.actions.cancel.disabled = true;
        showElement(this.actions.add);
        this.resetChallengeFromUI();
    }

    deleteChallenge(index) {
        this.deleteItem(index);
    }

    initialize() {

        const addButton = document.getElementById('add');
        addButton.addEventListener('click', () => this.addChallenge());

        const updateButton = document.getElementById('update');
        updateButton.addEventListener('click', () => this.updateChallenge());

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
