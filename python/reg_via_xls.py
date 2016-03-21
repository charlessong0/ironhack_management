'''
tihs script is used to register participants / judges via excel files
the format should be as follows:

username, password, name, email, type, githubName, phoneNumber, others?
'''
import xlrd
import colelctions
from collections import defaultdict

# open the excel file as book
book = xlrd.open_workbook("test.xls")
sh = book.sheet_by_index(0)
row_total = sh.nrows
col_total = sh.ncols

for num in range(1, row_total):
    

# connect and write data into mongo
