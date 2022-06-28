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
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

punchPassSchema.virtual('overduePunches').get(function() {
    const overduePunches = this.punches - 10;
    if (overduePunches > 0) {
        return overduePunches;
    }
});

// Set a virtual value based on if the punch pass is full, nearly full, or not nearly full.
// 2 for full, 1 for nearly full, 0 for not full or nearly full
punchPassSchema.virtual('isNearlyFull').get(function() {
    if (this.punches >= 10) {
        return 2;
    } else if (this.punches >= 8) {
        return 1;
    } else {
        return 0;
    }
});

const PunchPass = model('PunchPass', punchPassSchema);

module.exports = PunchPass;