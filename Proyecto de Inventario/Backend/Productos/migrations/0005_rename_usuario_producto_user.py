# Generated by Django 5.0.6 on 2024-06-26 14:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Productos', '0004_alter_producto_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='producto',
            old_name='usuario',
            new_name='user',
        ),
    ]
