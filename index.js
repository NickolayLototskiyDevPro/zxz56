function Project() {
    this.participants = [];
    this.pricing = {};
    this.isBusy = false;

    this.init = (participants, pricing) => {
        this.participants = (participants &&
            Array.isArray(participants) &&
            participants.every(el => 'seniorityLevel' in el)) ? participants : this.participants;
        this.pricing = (pricing && typeof pricing === 'object') ? pricing : {};
    };

    this.findParticipant = (functor, callbackFunction) => {
        if (this.isBusy || typeof functor !== 'function') return false;
        this.isBusy = true;

        setTimeout(() => {
            let participant = this.participants.find(functor);
            this.isBusy = false;
            if (typeof callbackFunction === 'function') {
                callbackFunction.call(this, typeof participant === 'undefined' ? null : participant);
            }
        });

    };

    this.findParticipants = (functor, callbackFunction) => {
        if (this.isBusy || typeof functor !== 'function') return false;
        this.isBusy = true;
        setTimeout(() => {
            let participants = this.participants.filter(functor);
            this.isBusy = false;
            if (typeof callbackFunction === 'function') {
                callbackFunction.call(this, participants);
            }
        });
    };


    this.addParticipant = (participantObject, callbackFunction) => {
        if (this.isBusy) return false;
        this.isBusy = true;
        setTimeout(() => {
            if (participantObject && typeof participantObject === 'object' && 'seniorityLevel' in participantObject) {
                this.participants.push(participantObject);
                this.isBusy = false;
                if (typeof callbackFunction === 'function') {
                    callbackFunction.call(this);
                }
            } else {
                this.isBusy = false;
                if (typeof callbackFunction === 'function') {
                    callbackFunction.call(this, new Error);
                }
            }
        });
    };
    this.removeParticipant = (participantObject, callbackFunction) => {
        if (this.isBusy) return false;
        this.isBusy = true;
        setTimeout(() => {
            let result = null;
            for (let i = 0; i < this.participants.length; i++) {
                if (this.participants[i] == participantObject) {
                    result = this.participants.splice(i, 1)[0];
                    break;
                }
            }
            this.isBusy = false;
            if (typeof callbackFunction === 'function') {
                callbackFunction.call(this, result);
            }
        });
    };

    this.setPricing = (participantPriceObject, callbackFunction) => {
        if (this.isBusy) return false;
        this.isBusy = true;
        setTimeout(() => {
            Object.assign(this.pricing, participantPriceObject);
            this.isBusy = false;
            if (typeof callbackFunction === 'function') {
                callbackFunction.call(this);
            }
        });
    };

    this.calculateSalary = (periodInDays) => {
        const hours = periodInDays * 8;
        return this.participants.map((participant) => {
            let current = participant.seniorityLevel;
            if (!this.pricing.hasOwnProperty(current)) {
                throw new Error();
            } else {
                return this.pricing[current] * hours;
            }
        }).reduce((prev, current) => prev + current);
    };
}

const ProjectModule = (function () {
    let instance;
    return {
        getInstance: function () {
            return instance || (instance = new Project());
        }
    }
})();


// /* реализация */
module.exports = {
    firstName: 'Igor',
    lastName: 'Vaskonyan',
    task: ProjectModule.getInstance()
}