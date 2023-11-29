# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class Users(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=128)
    role = models.PositiveIntegerField()
    
    class Meta:
        db_table = 'Users'  # Specify the table name

    def __str__(self):
        return self.name
    
class Disallowed_Users(models.Model):
    username = models.CharField(primary_key=True, max_length=128)
    
    class Meta:
        db_table = 'Disallowed_Users'  # Specify the table name

    def __str__(self):
        return self.name
    
class Categories(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=160, unique=True)
    href = models.CharField(max_length=160, unique=True)
    paragraph = models.TextField()
    isArchived = models.BooleanField(default=False)
    post_count = models.PositiveIntegerField()
    
    class Meta:
        db_table = 'Categories'  # Specify the table name

    def __str__(self):
        return self.name
    
class User_Upvotes(models.Model):
    category_id = models.PositiveIntegerField()
    post_id = models.PositiveIntegerField()
    user_id = models.PositiveIntegerField()
    
    class Meta:
        db_table = 'User_Upvotes'
        
    def __str__(self):
        return self.name

class Posts(models.Model):
    category_id = models.PositiveIntegerField()
    post_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=160)
    description = models.TextField()
    subcategory = models.CharField(max_length=256, null=True)
    progress = models.SmallIntegerField(default=0)
    date_posted = models.DateTimeField(auto_now_add=True)
    poster_id = models.IntegerField()
    poster_name = models.CharField(max_length=128, null=True)
    upvotes = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)
    is_pending_mod = models.BooleanField(default=False)
    is_hidden = models.BooleanField(default=False)
    post_count = models.PositiveIntegerField(default=0)
    
    class Meta:
        db_table = 'Posts'  # Specify the table name

    def __str__(self):
        return self.title
    
class Comments(models.Model):
    category_id = models.PositiveIntegerField()
    post_id = models.PositiveIntegerField()
    comment_id = models.AutoField(primary_key=True)
    user_id = models.PositiveIntegerField()
    user_name = models.CharField(max_length=128, null=True)
    body = models.CharField(max_length=256)
    comment_date = models.DateTimeField(auto_now_add=True)
    is_pending_mod = models.BooleanField(default=False)
    is_hidden = models.BooleanField(default=False)
    comment_count = models.PositiveIntegerField(default=0)
    
    class Meta:
        db_table = 'Comments'
    
    def __str__(self):
        return self.title
