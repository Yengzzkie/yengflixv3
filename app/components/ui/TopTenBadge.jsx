const TopTenBadge = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-red-500 max-w-fit py-1 px-2 rounded-sm">
        <span className="text-zinc-200 text-[7px] font-bold">TOP</span>
        <span className="text-sm font-semibold tracking-[-1px] leading-[10px]">10</span>
    </div>
  )
}

export default TopTenBadge