        const darkModeToggle = document.getElementById('dark-mode-toggle');
		const displayMode = document.getElementById('display-mode');
		const body = document.body;

		darkModeToggle.addEventListener('click', () => {
			body.classList.toggle('dark-mode');
			
            if (body.classList.contains('dark-mode')) {
                darkModeToggle.classList.remove('fa-toggle-on');
                darkModeToggle.classList.add('fa-toggle-off');
            } else {
                darkModeToggle.classList.remove('fa-toggle-off');
                darkModeToggle.classList.add('fa-toggle-on');
            }
		});