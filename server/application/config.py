'''
Configuration settings for the application are handled in this module
'''
import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    '''Base configuration'''

class ProductionConfig(Config):
    '''Production configuration'''

class DevelopmentConfig(Config):
    '''Development configuration'''

class TestingConfig(Config):
    '''Testing configuration'''
