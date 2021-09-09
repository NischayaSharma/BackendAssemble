module.exports = function (Sequence) {
    Sequence.getSequence = function (name, cb) {
        Sequence.findOne({
            where: {
                ModelName: name
            }
        },
            function (error, seq) {
                console.log(seq);
                if (seq != null && seq != '') {
                    SequenceId = seq.Sequence;
                    currSeq = SequenceId;

                    id_maxlen = seq.IdLen;
                    IdPrefix = seq.IdPrefix;
                    SequenceId++;
                    seq.Sequence = SequenceId;
                    seq.save();
                    console.log("set the sequence = " + currSeq);
                    if (id_maxlen && IdPrefix) {
                        seq_len = currSeq.toString().length;
                        new_id = "";
                        if (seq_len < id_maxlen) {
                            str = new Array(id_maxlen - seq_len + 1).join('0') + currSeq;
                        }
                        cb(IdPrefix + str);
                    } else {
                        cb(currSeq);
                    }

                } else {
                    cb(null, null);
                }
            });

    }

    Sequence.remoteMethod('getSequence', {
        accepts: {
            arg: 'ModelName',
            type: 'string',
            required: true
        },
        returns: {
            arg: 'SequenceId',
            type: 'integer'
        },
        description: "get Sequence for a model"
    });
};
