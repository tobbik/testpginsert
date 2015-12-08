var Generator = require( './generator' );
var PQ        = require( 'libpq' );
var db_str = "postgres://postgres:password@localhost:5432/inserttest";


Ingester = function( max )
{
	this.generator = new Generator( );
	this.conn      = new PQ();
	this.conn.connectSync( db_str );
	this.max       = max;
	this.s_date_time = new Date( );
	this.tops      = 0;
	this.subs      = 0;
};


Ingester.prototype.walker = function( )
{
	this.conn.exec( 'BEGIN;' );
	for (var tl=0; tl<1000; tl++)
	{
		var groups = (this.max) ? 3 : this.generator.randint( 1, 3 );
		var t_q = this.generator.get_toplevel( groups );
		this.conn.exec( t_q );
		//console.log( this.conn.getvalue( 0 ) );
		this.handle_sub( this.conn.getvalue(0), groups );
	}
	this.conn.exec( 'COMMIT;' );
	this.conn.finish( );
	var s_date_time_end = new Date( );
	console.log( 'TopLevels: %d    SubLevels: %d    Time: %s Seconds   ',
		this.tops, this.subs,
		(s_date_time_end.getTime()-this.s_date_time.getTime())/1000
	);
};

Ingester.prototype.handle_sub = function( tl_id, groups )
{
	console.log( tl_id );
	this.tops++;
	for (var g=1; g<groups; g++ )
	{
		var subitems = this.generator.randint( 1, 15 );
		for (var o=1; o<subitems; o++)
		{
			this.subs++;
			var s_q = this.generator.get_sublevel( tl_id, g, o );
			this.conn.exec( s_q );
		}
	}
};

ing = new Ingester( false );
ing.walker();
