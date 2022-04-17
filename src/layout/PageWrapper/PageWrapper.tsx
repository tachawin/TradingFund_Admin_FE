import { useLayoutEffect, forwardRef } from 'react';
import classNames from 'classnames';
import { useEffect } from 'react';
import { getAccessToken } from 'common/utils/auth';
import { useNavigate } from 'react-router-dom';
import { pages } from 'menu';

interface PageWrapperInterface {
	id?: string
	title?: string,
	description?: string,
	children: any,
	className?: string,
}

const PageWrapper = forwardRef<HTMLDivElement, PageWrapperInterface>(({ id, title, description, className, children }, ref) => {
	useLayoutEffect(() => {
		document.getElementsByTagName('TITLE')[0].textContent = `${title ? `${title} | ` : ''}${
			process.env.REACT_APP_SITE_NAME
		}`;
		document.querySelector('meta[name="description"]')?.setAttribute('content', description ?? "");
	});

	const navigate = useNavigate()

	useEffect(() => {
		const accessToken = getAccessToken()
		if (!accessToken) {
			navigate(`/${pages.login.path}`)
		} else if (id === pages.login.id) {
			navigate(-1)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div ref={ref} className={classNames('page-wrapper', 'container-fluid', className)}>
			{children}
		</div>
	);
});

export default PageWrapper;
