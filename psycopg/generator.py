import math
from datetime import datetime
from rng import Rng

class Generator:
    start = datetime(1980, 1, 1, 0, 0, 0, 0).timestamp( )
    end   = datetime(2014, 1, 1, 0, 0, 0, 0).timestamp( )


    def randint( self, minimum, maximum ):
        return math.floor( self.rng.next_float( ) * (maximum - minimum) ) + minimum;

    def __init__( self ):
        with open( '../words.txt' ) as f:
            self.words = f.read( ).splitlines( )
        self.length = len( self.words )
        self.rng    = Rng( [82,101,14,7,213,234,54,123,253] );

    def getword( self):
        return self.words[ self.randint( 0, self.length-1 ) ]

    def getphrase( self, lower, upper ):
        p = []
        for x in range( 0, self.randint( lower, upper ) ):
            p.append( self.words[ self.randint( 0, self.length-1 ) ] )
        return ' '.join( p )

    def gettimestamp( self ):
        return datetime.fromtimestamp( self.randint( self.start, self.end ) )

    def get_toplevel( self, groups ):
        return """INSERT INTO toplevel (
   name, tag1, tag2, groups, upc, valid_since, has_feature,
   owner, master_tag, description1, description2, created_at
) VALUES (
   '%s', '%s','%s', %d,     '%s', '%s',        %s,
   '%s', '%s',        '%s',         '%s',        '%s') RETURNING toplevel_id""" % (\
           self.getphrase(2,5),
           self.getword(),
           self.getword(),
           groups,
           self.getword(),      # TODO: make real UPC
           self.gettimestamp().isoformat( ),
           "True" if self.randint(1,100) % 2 == 0  else "False",
           self.getphrase(2,5),
           self.getword(),
           self.getphrase(5,12),
           self.getphrase(4,9),
           datetime.now().isoformat()
           )

    def get_sublevel( self, toplevel_id, grouping, order_number ):
        return """INSERT INTO sublevel (
   toplevel_id, grouping, order_number, is_valid, upc, name,
   tag1, tag2, owner, master_tag, description1, description2, length
) VALUES (
   %d, %d, %d, %s, '%s','%s',
   '%s', '%s', '%s',  '%s',       '%s',        '%s',         %d) RETURNING sublevel_id""" % (\
           toplevel_id,
           grouping,
           order_number,
           "True" if self.randint(1,100) % 2 == 0  else "False",
           self.getword(),      # TODO: make real UPC
           self.getphrase(4,10),

           self.getword(),
           self.getword(),
           self.getphrase(1,5),
           self.getword(),
           self.getphrase(5,12),
           self.getphrase(4,9),

           self.randint(23,500)
           )




