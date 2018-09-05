var a = [];
var count = 0;
function instruction() {
	// body...
	console.log('How to use this app:')
	console.log('	Type \'cn-show\' to show all notes');
	console.log('	Type \'cn-add [note\'s name]\' to add a note');
	console.log('	Type \'cn-modify [note\'s position](in note list) [note\'s new name]\' to modify note');
	console.log('	Type \'cn-delete [note\'s position](in note list)\' to delete a note');
}
function readInstruction() {
	console.log('==================================');
	console.log('Read the instruction again' + '\n');
	console.log('How to use this app:')
	console.log('	Type \'cn-show\' to show all notes');
	console.log('	Type \'cn-add [note\'s name]\' to add a note');
	console.log('	Type \'cn-modify [note\'s position](in note list) [note\'s new name]\' to modify note');
	console.log('	Type \'cn-delete [note\'s position](in note list)\' to delete a note');
}
instruction();

process.stdin.resume();
process.stdin.on('data', function(data) {
	try {
		let cmd, spacepos;
		data = data.toString().slice(0, data.toString().length - 1); // Khi nhập vào và bấm enter thì chuỗi nhập vào sẽ thêm ký tự xuống dòng \n nên cần lọc bỏ ký tự này

		// let cmd = data.slice(0, data.indexOf(' '));

		if (data.indexOf('cn-show') !== 0 && data.indexOf('cn-add') !== 0 && data.indexOf('cn-delete') !== 0 && data.indexOf('cn-modify') !== 0) {
			
			readInstruction();
		} else {
			if (data.indexOf('cn-show') === 0 && data.indexOf(' ') > -1) {
				readInstruction();
			}
			/*if (data === 'cn-show') {
				console.log('All notes:' + '\n');
					for (var i in a) {
						console.log(a[i]);
					}
			}*/
			if (data.indexOf(' ') > -1) {
				spacepos = data.indexOf(' ');
				cmd = data.slice(0, data.indexOf(' '));
			} else {
				cmd = data;
			}
			let content = data.slice(spacepos + 1, data.length);
			switch (cmd) {
				case 'cn-show':
					
					if (a.length === 0) {
						console.log('Note list is empty');
					} else {
						console.log('All notes');
						for (var i in a) {
							console.log(`	${parseInt(i) + 1}. ${a[i]}`);
						}
					}
					break;

				case 'cn-add':
					a[count] = content;
					console.log(`Added: ${a[count]}`);
					count++;
					break;
				case 'cn-modify':

					let pos = parseInt(data.slice(spacepos + 1, data.length));
					console.log(`Modified ${a[pos - 1]}`);
					a[pos - 1] = content.slice(content.indexOf(' ') + 1, content.length);
					break;
				case 'cn-delete':
					console.log(`Deleted note: ${a[parseInt(content) - 1]}`);
					a.splice(parseInt(content) - 1, 1);

			}
		}

		/*if (number !== 1 && number !== 2 && number !== 3 && number !== 4) {
			console.log('Read the instruction again' + '\n');
			instruction();
		}*/
		/*a[count] = data;
		count++;*/
		// console.log(data);
		//process.stdout.write(`Result: ${a[count]} \n`);
		// console.log(parseInt(data.toString()));
		
		/*if (parseInt(data) === 1) {
			console.log('All notes:' + '\n');
			for (var i in a) {
				console.log(a[i]);
			}
		}*/
	} catch(err) {
		process.stderr.write(err.message + '\n');
	}
});