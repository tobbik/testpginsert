var Generator = require( '../node-libpq/generator' );
var Pg        = require( 'pg-native' );
var db_str = "postgres://postgres:password@localhost:5432/inserttest";

function* querygen( max )
{
	var generator = new Generator( );
	var tl = 0;
	var last_top_id = 0;
	var last_sub_id = 0;
	while (tl<1000)
	{
		tl++;
		var groups = ( max ) ? 3 : Generator.randint( 1, 3 );
		var t_q = generator.get_toplevel( groups );
		last_top_id = yield t_q;
		console.log( last_top_id );
		for (var g=1; g<groups; g++ )
		{
			for (var o=1; o<15; o++)
			{
				var s_q = generator.get_sublevel( last_top_id, g, o );
				last_sub_id = yield  s_q;
			}
		}
	}
};

var gen = querygen( true );

var client = new Pg( );
var id     = 0;


var runQuery = function( )
{
	var t_q = gen.next( id );
	console.log( id, t_q );
	if (! t_q.done )
	{
		client.query( t_q.value, function( err, rows ) {
			if(err) throw err ;
			id = rows[ 0 ].toplevel_id;
			runQuery( );
		} );
	}
	else
	{
		client.end( );
	}
};

client.connect( db_str, function( err ) {
	if(err) throw err;

	runQuery( );
} );
