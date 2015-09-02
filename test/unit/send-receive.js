'use strict';

/* jshint expr: true */
/* eslint no-unused-expressions:0 */
/* eslint no-underscore-dangle:0 */

var expect  = require( 'chai' ).expect;
var rewire  = require( 'rewire' );
var SendRec = rewire( process.cwd() + '/lib/send-rec' );
var helper  = require( '../helper' );

describe( 'send and receive', function () {

	describe( 'send', function () {
		var Producer;
		var sendRec;
		before( function () {
			sendRec  = new SendRec();
			Producer = SendRec.__get__( 'Sender' );
			SendRec.__set__( 'Sender', helper.Producer );
		} );

		after( function () {
			SendRec.__set__( 'Sender', Producer );
		} );

		it( 'should accept a string', function ( done ) {
			sendRec.send( 'v1.sessions.get', { 'token' : '123' }, function ( data ) {
				expect( data.token ).to.equal( '123' );
				done();
			} );
		} );

		it( 'should accept a object option', function ( done ) {
			sendRec.send( { 'messageType' : 'v1.session.get' }, { 'token' : '123' }, function ( data ) {
				expect( data.token ).to.equal( '123' );
				done();
			} );
		} );

	} );

	describe( 'receive', function () {
		var Consumer;
		var sendRec;
		before( function () {
			sendRec  = new SendRec();
			Consumer = SendRec.__get__( 'Receiver' );
			SendRec.__set__( 'Receiver', helper.Consumer );
		} );

		after( function () {
			SendRec.__set__( 'Receiver', Consumer );
		} );

		it( 'should accept a string', function ( done ) {
			sendRec.receive( 'v1.sessions.get', function ( data ) {
				expect( data ).to.equal( 'done' );
				done();
			} );
		} );

		it( 'should accept a object option', function ( done ) {
			sendRec.receive( { 'messageType' : 'v1.session.get' }, function ( data ) {
				expect( data ).to.equal( 'done' );
				done();
			} );
		} );

	} );
} );
