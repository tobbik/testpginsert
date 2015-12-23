import os,sys
import cProfile
import psycopg2
from generator import Generator

class Ingester:
    generator  = Generator()

    def __init__( self, domax,conn: object ):
        self.conn    = conn
        self.domax   = domax

    def dispose( self ):
        pass

    def walker( self ):
        profiler = cProfile.Profile( )
        profiler.enable( )
        cursor = self.conn.cursor( )
        for tl in range( 0, 1000 ):
            groups = 3 if self.domax else self.generator.randint( 1, 3 )
            t_q = self.generator.get_toplevel( groups )
            print( tl )
            cursor.execute( t_q )
            tl_id = cursor.fetchone( )[ 0 ]
            self.handle_sub( cursor, tl_id, groups )

        self.conn.commit( )
        profiler.disable( )
        profiler.print_stats( )

    def handle_sub( self, cursor, tl_id, groups ):
        for g in range( 1, groups ):
            subitems = self.generator.randint( 1, 15 );
            for o in range( 1, subitems ):
                s_q = self.generator.get_sublevel( tl_id, g, o )
                cursor.execute( s_q )
                sl_id = cursor.fetchone( )[ 0 ]

if __name__ == '__main__':
    db_host   = os.getenv( 'DB_HOST', 'localhost' )

    conn  = psycopg2.connect(
        dbname   = 'inserttest',
        user     = 'postgres',
        password = 'password',
        host     = db_host,
        port     = 5432 )



    ingester = Ingester( False, conn )
    ingester.walker( )
