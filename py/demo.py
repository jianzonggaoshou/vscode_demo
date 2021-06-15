import xml.etree.ElementTree as ET
from xml.etree import ElementTree


class CommentedTreeBuilder(ElementTree.TreeBuilder):
    def __init__(self, *args, **kwargs):
        super(CommentedTreeBuilder, self).__init__(*args, **kwargs)

    def comment(self, data):
        self.start(ElementTree.Comment, {})
        self.data(data)
        self.end(ElementTree.Comment)


fXml = 'country_data.xml'
parser = ET.XMLParser(target=CommentedTreeBuilder())
et = ElementTree.parse(fXml, parser=parser)
root = et.getroot()
print(root)
for item in root:
    print(item.tag)
    iscomment = (type(item.tag) != type('str'))
    print(iscomment)