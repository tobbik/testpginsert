var Generator = require( '../node-pq/generator' );
var Pg        = require( 'pg-native' );
var db_str = "postgres://postgres:password@localhost:5432/inserttest";

var s_date_time = new Date( );

function* querygen( max )
{
	var generator = new Generator( );
	var tl = 0;
	var last_top_id = 0;
	var last_sub_id = 0;
	yield 'BEGIN;';
	while (tl<1000)
	{
		tl++;
		var groups = ( max ) ? 3 : generator.randint( 1, 3 );
		var t_q = generator.get_toplevel( groups );
		last_top_id = yield t_q;
		console.log( last_top_id );
		for (var g=1; g<groups; g++ )
		{
			var subitems = generator.randint( 1, 15 );
			for (var o=1; o<subitems; o++)
			{
				var s_q = generator.get_sublevel( last_top_id, g, o );
				last_sub_id = yield  s_q;
			}
		}
	}
	yield 'COMMIT;';
};

var gen = querygen( false);

var client = new Pg( );
var id     = 0;

var runQuery = function( )
{
	var t_q = gen.next( id );
	//console.log( id, t_q );
	if (! t_q.done )
	{
		client.query( t_q.value, function( err, rows ) {
			if(err) throw err ;
			if (rows.length>0)
				id = rows[ 0 ].toplevel_id;
			runQuery( );
		} );
	}
	else
	{
		client.end( );
		var s_date_time_end = new Date( );
		console.log( '                     Result:        ' +
				+ (s_date_time_end.getTime()-s_date_time.getTime())/1000
				+ ' seconds' );
	}
};

client.connect( db_str, function( err ) {
	if(err) throw err;

	runQuery( );
} );
