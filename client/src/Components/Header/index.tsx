import CreateImageForm from '../CreateImageForm';
import Profile from '../Icons/Profile';
import clsx from 'clsx';

function Header({ className }: { className?: string }) {
  return (
    <header
      className={clsx(
        'min-w-[1000px] h-[100px] bg-app-bg2 flex p-6 gap-6',
        className
      )}
    >
      <div className="text-5xl font-serif text-app-text">Imagify</div>
      <CreateImageForm className="my-auto grow" />
      <Profile className="my-auto" />
      {/* <div className="flex text-app-text h-[60px]">
        <div className="flex items-center m-4">
          <Link to={'/'}>
            <div className="flex pr-3 pl-3">
              <div className="mt-7 text-xs xl:text-sm font-bold">Home</div>
            </div>
          </Link>
          <Link to={'/about'}>
            <div className="flex pr-3 pl-3">
              <div className="mt-7 text-xs xl:text-sm font-bold">About</div>
            </div>
          </Link>
          <Link to={'/contact'}>
            <div className="flex pr-3 pl-3">
              <div className="mt-7 text-xs xl:text-sm font-bold">Contact</div>
            </div>
          </Link>
        </div>
      </div> */}
    </header>
  );
}

export default Header;
