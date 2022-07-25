const { Schema, model } = require('mongoose');

const punchPassSchema = new Schema(
    {
        // pass holder's name
        name: {
            type: String,
            required: true
        },
        // pass type - e.g. regular, unlimited...
        passType: {
            type: String,
            required: true
        },
        // number of punches
        punches: {
            type: Number,
            default: 0
        },
        // expiration date
        expirationDate: {
            // format: YYYY-MM-DD
            type: Date
        },
        // note on card, e.g. 'Contacted last Wednesday'
        note: {
            type: String
        },
        // boolean, true if we have received their waiver
        waiverReceived: {
            type: Boolean,
            default: false
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

punchPassSchema.virtual('overduePunches').get(function() {
    if (this.passType === 'regular' || this.passType === 'Regular') {
        const overduePunches = this.punches - 10;
        if (overduePunches > 0) {
            return overduePunches;
        };
    };
});

// Set a virtual value based on if the punch pass is full, nearly full, or not nearly full.
// 2 for full, 1 for nearly full, 0 for not full or nearly full
punchPassSchema.virtual('isNearlyFull').get(function() {
    const currentDate = Date.now();
    let expDate = Date.parse(this.expirationDate);

    if (currentDate > expDate) {
        return true;
    }
    
    if (this.passType === 'regular' || this.passType === 'Regular') {        
        if (this.punches >= 10) {
            return true;
        } else {
            return false;
        }
    }; 

    return false;
});

const PunchPass = model('PunchPass', punchPassSchema);

module.exports = PunchPass;