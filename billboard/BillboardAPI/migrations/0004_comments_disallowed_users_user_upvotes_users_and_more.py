# Generated by Django 4.0 on 2023-11-29 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BillboardAPI', '0003_posts_delete_careerservices'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('category_id', models.PositiveIntegerField()),
                ('post_id', models.PositiveIntegerField()),
                ('comment_id', models.AutoField(primary_key=True, serialize=False)),
                ('user_id', models.PositiveIntegerField()),
                ('user_name', models.CharField(max_length=128, null=True)),
                ('body', models.CharField(max_length=256)),
                ('comment_date', models.DateTimeField(auto_now_add=True)),
                ('is_pending_mod', models.BooleanField(default=False)),
                ('is_hidden', models.BooleanField(default=False)),
                ('comment_count', models.PositiveIntegerField(default=0)),
            ],
            options={
                'db_table': 'Comments',
            },
        ),
        migrations.CreateModel(
            name='Disallowed_Users',
            fields=[
                ('username', models.CharField(max_length=128, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'Disallowed_Users',
            },
        ),
        migrations.CreateModel(
            name='User_Upvotes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_id', models.PositiveIntegerField()),
                ('post_id', models.PositiveIntegerField()),
                ('user_id', models.PositiveIntegerField()),
            ],
            options={
                'db_table': 'User_Upvotes',
            },
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=128)),
                ('role', models.PositiveIntegerField()),
            ],
            options={
                'db_table': 'Users',
            },
        ),
        migrations.RemoveField(
            model_name='posts',
            name='category',
        ),
        migrations.AddField(
            model_name='categories',
            name='isArchived',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='categories',
            name='post_count',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='posts',
            name='category_id',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='posts',
            name='post_count',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='categories',
            name='href',
            field=models.CharField(max_length=160, unique=True),
        ),
        migrations.AlterField(
            model_name='categories',
            name='name',
            field=models.CharField(max_length=160, unique=True),
        ),
        migrations.AlterField(
            model_name='posts',
            name='subcategory',
            field=models.CharField(max_length=256, null=True),
        ),
    ]
