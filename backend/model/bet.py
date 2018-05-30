from marshmallow import Schema, fields

class Bet():
    def __init__(self, matchId, firstHalfGoals, secondHalfGoals, finalResult):
        self.matchId = matchId
        self.firstHalfGoals = firstHalfGoals
        self.secondHalfGoals = secondHalfGoals
        self.finalResult = finalResult

    def __repr__(self):
        return '<Bet(id={self.matchId!r})>'.format(self=self)

class BetSchema(Schema):
    matchId = fields.Int(required=True)
    firstHalfGoals = fields.List(fields.Int(required=True))
    secondHalfGoals = fields.List(fields.Int(required=True))
    finalResult = fields.List(fields.Int(required=False)) 
