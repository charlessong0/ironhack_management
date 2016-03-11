'''
this script is used to generate all the feedback scores for sending back to participants. The node server will call this script and get the generated files to send out
'''

import xlwt


# connect and read data from mongodb


# generate the xls file
book = xlwt.Workbook()
sh = book.add_sheet('feedback', cell_overwrite_ok=True)




book.save("test.xls")
