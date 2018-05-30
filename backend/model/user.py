from marshmallow import Schema, fields
from .bet import Bet, BetSchema

class User():
    def __init__(self, userId, firstName, lastName, roles, userName, password, phone, points, active, bets):
        self.userId = userId
        self.firstName = firstName
        self.lastName = lastName
        self.roles = roles
        self.userName = userName
        self.password = password
        self.phone = phone
        self.points = points
        self.active = active
        self.bets = bets

    def __repr__(self):
        return '<User(id={self.userId!r})>'.format(self=self)

class UserSchema(Schema):
    userId = fields.Int(required=True)
    firstName = fields.Str(required=True)
    lastName = fields.Str(required=True)
    roles = fields.List(fields.Str(required=False, allow_none=True))
    userName = fields.Str(required=True)
    password = fields.Str(required=True)
    phone = fields.Str(required=False, allow_none=True)
    points = fields.Int(required=False, allow_none=True)
    active = fields.Bool(required=False, allow_none=True)
    bets = fields.List(fields.Nested(BetSchema), required=False, allow_none=True)
