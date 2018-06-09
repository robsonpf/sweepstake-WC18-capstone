from marshmallow import Schema, fields

class Bet():
    def __init__(self, matchId, finalResult, winnerTeam):
        self.matchId = matchId
        self.finalResult = finalResult
        self.winnerTeam = winnerTeam

    def __repr__(self):
        return '<Bet(id={self.matchId!r})>'.format(self=self)

class BetSchema(Schema):
    matchId = fields.Int(required=True)
    finalResult = fields.List(fields.Int(required=True))
    winnerTeam = fields.Int(required=True)
