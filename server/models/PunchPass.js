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
            required: true,
            default: 0,
            set: function(v) {
                if (v >= 8) {
                    console.log(`${this.name}'s pass is almost full!`);
                }
            }
        }
    },
    {}
);

punchPassSchema.virtual('overduePunches').get(function() {
    const overduePunches = this.punches - 10;
    if (overduePunches > 0) {
        return overduePunches;
    }
});

const PunchPass = model('PunchPass', punchPassSchema);

module.exports = PunchPass;