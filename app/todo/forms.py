#!/usr/bin/env python
# encoding: utf-8
"""
@version: python3.7
@author: JYFelt
@license: Apache Licence 
@contact: JYFelt@163.com
@site: https://blog.csdn.net/weixin_38034182
@software: PyCharm
@file: forms.py
@time: 2019/2/5 20:52
"""
from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, ValidationError
from wtforms.validators import DataRequired
from ..models import Category


class AddEventForm(FlaskForm):
    """
    添加事件的表单
    """
    title = StringField('事件', validators=[DataRequired()])
    category = SelectField('类别', coerce=int)
    submit = SubmitField('添加')

    def __init__(self, *args, **kwargs):
        super(AddEventForm, self).__init__(*args, **kwargs)
        self.category.choices = [(category.id, category.name) for category in
                                 Category.query.order_by(Category.name).all()]


class AddCategoryForm(FlaskForm):
    """
    添加类别的表单
    """
    name = StringField('类别', validators=[DataRequired()])
    submit = SubmitField('添加')

    def validate_name(self, field):
        if Category.query.filter_by(name=field.data).first():
            raise ValidationError('类别已经存在')


class EditEventForm(FlaskForm):
    """
    添加类别的表单
    """
    title = StringField('事件', validators=[DataRequired()])
    category = SelectField('类别', coerce=int)
    submit = SubmitField('修改')

    def __init__(self, *args, **kwargs):
        super(EditEventForm, self).__init__(*args, **kwargs)
        self.category.choices = [(category.id, category.name) for category in
                                 Category.query.order_by(Category.name).all()]
