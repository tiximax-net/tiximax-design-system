import React from 'react';

/* ============================================================
   TIXIMAX Design System — Chat
   Bộ component chat dùng cho 3 bối cảnh:
   · Widget góc phải (web)  → ChatLauncher + ChatPanel
   · Full screen (web)      → ConversationList + ChatHeader + ChatMessage…
   · Mobile                 → ChatHeader variant="mobile" + ChatComposer
   Toàn bộ màu/kích thước lấy từ token, tự đảo theo [data-theme="dark"].
   ============================================================ */

const FONT = 'var(--font-sans)';

/* ---------- Icon nội bộ (Lucide-style, stroke currentColor) ---------- */
type IconProps = { size?: number; style?: React.CSSProperties };

function Svg({ size = 16, style, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flex: 'none', display: 'block', ...style }}
    >
      {children}
    </svg>
  );
}

const Icon = {
  check: (p: IconProps) => <Svg {...p}><path d="M20 6L9 17l-5-5" /></Svg>,
  checkCheck: (p: IconProps) => <Svg {...p}><path d="M18 6L7 17l-5-5" /><path d="M22 10l-7.5 7.5L13 16" /></Svg>,
  clock: (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></Svg>,
  send: (p: IconProps) => <Svg {...p}><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></Svg>,
  paperclip: (p: IconProps) => <Svg {...p}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></Svg>,
  smile: (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01" /><path d="M15 9h.01" /></Svg>,
  mic: (p: IconProps) => <Svg {...p}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><path d="M12 19v3" /></Svg>,
  plus: (p: IconProps) => <Svg {...p}><path d="M12 5v14" /><path d="M5 12h14" /></Svg>,
  minus: (p: IconProps) => <Svg {...p}><path d="M5 12h14" /></Svg>,
  x: (p: IconProps) => <Svg {...p}><path d="M18 6L6 18" /><path d="M6 6l12 12" /></Svg>,
  chevronLeft: (p: IconProps) => <Svg {...p}><path d="M15 18l-6-6 6-6" /></Svg>,
  search: (p: IconProps) => <Svg {...p}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3" /></Svg>,
  info: (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></Svg>,
  more: (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></Svg>,
  message: (p: IconProps) => <Svg {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Svg>,
  file: (p: IconProps) => <Svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 13h6" /><path d="M9 17h6" /></Svg>,
  image: (p: IconProps) => <Svg {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" /></Svg>,
  package: (p: IconProps) => <Svg {...p}><path d="M16.5 9.4L7.55 4.24" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="M3.29 7L12 12l8.71-5" /><path d="M12 22V12" /></Svg>,
};

/* ============================================================
   Avatar
   ============================================================ */
export interface ChatAvatarProps {
  /** Chữ viết tắt hiển thị trong avatar */
  initials?: string;
  /** Đường kính (px) */
  size?: number;
  /** Tông màu nền */
  tone?: 'gold' | 'navy' | 'blue';
  /** Hiện chấm trạng thái online */
  online?: boolean;
}

const AVATAR_TONES: Record<string, React.CSSProperties> = {
  gold: { background: 'var(--gold-100)', color: 'var(--gold-700)' },
  navy: { background: 'var(--navy-100)', color: 'var(--navy-600)' },
  blue: { background: 'var(--blue-50)', color: 'var(--blue-600)' },
};

export function ChatAvatar({ initials = 'TX', size = 40, tone = 'gold', online = false }: ChatAvatarProps) {
  return (
    <span style={{
      position: 'relative',
      width: size,
      height: size,
      flex: 'none',
      borderRadius: 'var(--radius-pill)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT,
      fontSize: Math.max(10, Math.round(size * 0.33)),
      fontWeight: 800,
      ...AVATAR_TONES[tone],
    }}>
      {initials}
      {online && (
        <span style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: Math.max(8, Math.round(size * 0.26)),
          height: Math.max(8, Math.round(size * 0.26)),
          borderRadius: 'var(--radius-pill)',
          background: 'var(--green-400)',
          border: '2px solid var(--surface-card)',
        }} />
      )}
    </span>
  );
}

/* ============================================================
   Message bubble
   ============================================================ */
export interface ChatMessageProps {
  /** in = đối phương (trái) · out = mình (phải, nền gold) */
  side?: 'in' | 'out';
  children?: React.ReactNode;
  /** Giờ gửi, ví dụ "09:42" */
  time?: string;
  /** Tên người gửi hiển thị cạnh giờ (chỉ dùng cho side="in") */
  author?: string;
  /** Trạng thái gửi — chỉ hiển thị với side="out" */
  status?: 'sending' | 'sent' | 'read';
  /** Avatar đặt trước bubble (side="in") */
  avatar?: React.ReactNode;
  /** Bubble liền mạch trong cùng chuỗi tin (bo góc đều) */
  grouped?: boolean;
}

export function ChatMessage({
  side = 'in',
  children,
  time,
  author,
  status,
  avatar,
  grouped = false,
}: ChatMessageProps) {
  const isOut = side === 'out';
  const radius = grouped ? '16px' : isOut ? '16px 16px 4px 16px' : '16px 16px 16px 4px';
  const StatusIcon = status === 'read' ? Icon.checkCheck : status === 'sent' ? Icon.check : Icon.clock;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: isOut ? 'flex-end' : 'flex-start' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', maxWidth: '82%' }}>
        {!isOut && (avatar ?? <span style={{ width: 28, flex: 'none' }} />)}
        <div style={{
          padding: '9px 13px',
          fontFamily: FONT,
          fontSize: 'var(--fs-body-sm)',
          lineHeight: 1.45,
          borderRadius: radius,
          background: isOut ? 'var(--brand-gold)' : 'var(--surface-card)',
          color: isOut ? 'var(--navy-900)' : 'var(--text-primary)',
          border: isOut ? 'none' : '1px solid var(--border-subtle)',
        }}>
          {children}
        </div>
      </div>
      {(time || author || status) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          paddingLeft: isOut ? 0 : 36,
          fontFamily: FONT,
          fontSize: 11,
          color: 'var(--text-tertiary)',
        }}>
          <span>{[author, time].filter(Boolean).join(' · ')}</span>
          {isOut && status && (
            <StatusIcon size={13} style={{ color: status === 'read' ? 'var(--brand-blue)' : undefined }} />
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Divider ngày · tin hệ thống
   ============================================================ */
export interface ChatDividerProps { children?: React.ReactNode }

export function ChatDivider({ children = 'Hôm nay' }: ChatDividerProps) {
  const line: React.CSSProperties = { flex: 1, height: 1, background: 'var(--border-default)' };
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      margin: '4px 0',
      fontFamily: FONT,
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--text-tertiary)',
    }}>
      <span style={line} />{children}<span style={line} />
    </div>
  );
}

export function ChatSystemMessage({ children }: ChatDividerProps) {
  return (
    <div style={{
      alignSelf: 'center',
      fontFamily: FONT,
      fontSize: 11.5,
      color: 'var(--text-tertiary)',
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-pill)',
      padding: '4px 12px',
    }}>
      {children}
    </div>
  );
}

/* ============================================================
   Typing indicator
   ============================================================ */
export function ChatTyping({ avatar }: { avatar?: React.ReactNode }) {
  const dot: React.CSSProperties = {
    width: 6,
    height: 6,
    borderRadius: 'var(--radius-pill)',
    background: 'var(--text-tertiary)',
    opacity: 0.55,
  };
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
      {avatar}
      <span style={{
        display: 'inline-flex',
        gap: 4,
        alignItems: 'center',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px 16px 16px 4px',
        padding: '12px 14px',
      }}>
        <i style={dot} /><i style={{ ...dot, opacity: 0.4 }} /><i style={{ ...dot, opacity: 0.25 }} />
      </span>
    </div>
  );
}

/* ============================================================
   Attachment — ảnh / tệp
   ============================================================ */
export interface ChatAttachmentProps {
  variant?: 'image' | 'file';
  /** Tên tệp (variant="file") */
  name?: string;
  /** Dung lượng / mô tả phụ (variant="file") */
  meta?: string;
  /** URL ảnh (variant="image") — bỏ trống sẽ hiện placeholder */
  src?: string;
  /** Chú thích dưới ảnh */
  caption?: string;
}

export function ChatAttachment({
  variant = 'file',
  name = 'HoaDon_TX48210.pdf',
  meta = '248 KB · PDF',
  src,
  caption,
}: ChatAttachmentProps) {
  if (variant === 'image') {
    return (
      <div style={{
        width: 200,
        borderRadius: '16px 16px 16px 4px',
        overflow: 'hidden',
        border: '1px solid var(--border-default)',
        fontFamily: FONT,
      }}>
        {src ? (
          <img src={src} alt={caption ?? ''} style={{ display: 'block', width: '100%', height: 120, objectFit: 'cover' }} />
        ) : (
          <div style={{
            height: 120,
            background: 'var(--surface-sunken)',
            color: 'var(--text-tertiary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Icon.image size={22} />
          </div>
        )}
        {caption && (
          <div style={{
            padding: '8px 12px',
            fontSize: 'var(--fs-caption)',
            background: 'var(--surface-card)',
            color: 'var(--text-primary)',
          }}>
            {caption}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '16px 16px 16px 4px',
      padding: '10px 14px 10px 10px',
      fontFamily: FONT,
    }}>
      <span style={{
        width: 36,
        height: 36,
        flex: 'none',
        borderRadius: 'var(--radius-md)',
        background: 'var(--gold-100)',
        color: 'var(--gold-700)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Icon.file size={18} />
      </span>
      <span>
        <span style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>{name}</span>
        <span style={{ display: 'block', fontSize: 11.5, color: 'var(--text-tertiary)' }}>{meta}</span>
      </span>
    </div>
  );
}

/* ============================================================
   Order card trong chat
   ============================================================ */
export interface ChatOrderCardProps {
  /** Mã đơn */
  code?: string;
  /** Nhãn trạng thái */
  status?: string;
  /** Các cặp nhãn — giá trị hiển thị trong thân thẻ */
  rows?: { label: string; value: string }[];
}

export function ChatOrderCard({
  code = 'TX-48210',
  status = 'Đang vận chuyển',
  rows = [
    { label: 'Tuyến', value: 'Tokyo → Hà Nội' },
    { label: 'Dự kiến giao', value: '10/06/2026' },
  ],
}: ChatOrderCardProps) {
  return (
    <div style={{
      maxWidth: 320,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: '16px 16px 16px 4px',
      overflow: 'hidden',
      fontFamily: FONT,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 14px',
        borderBottom: '1px solid var(--border-subtle)',
        fontSize: 'var(--fs-caption)',
        fontWeight: 700,
        color: 'var(--text-primary)',
      }}>
        <span style={{ color: 'var(--text-brand)', display: 'flex' }}><Icon.package size={15} /></span>
        {code}
        <span style={{
          marginLeft: 'auto',
          fontSize: 10.5,
          fontWeight: 700,
          background: 'var(--gold-100)',
          color: 'var(--gold-700)',
          borderRadius: 'var(--radius-pill)',
          padding: '2px 9px',
        }}>
          {status}
        </span>
      </div>
      <div style={{ padding: '10px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
        {rows.map((r) => (
          <div key={r.label}>
            <div style={{ color: 'var(--text-tertiary)' }}>{r.label}</div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Quick replies
   ============================================================ */
export interface ChatQuickRepliesProps {
  items?: string[];
  onSelect?: (item: string) => void;
}

export function ChatQuickReplies({
  items = ['Tra cứu đơn', 'Bảng giá', 'Gặp nhân viên'],
  onSelect,
}: ChatQuickRepliesProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect?.(item)}
          style={{
            fontFamily: FONT,
            fontSize: 'var(--fs-caption)',
            fontWeight: 600,
            color: 'var(--text-brand)',
            background: 'var(--surface-card)',
            border: '1.5px solid var(--gold-300)',
            borderRadius: 'var(--radius-pill)',
            padding: '7px 14px',
            minHeight: 32,
            cursor: 'pointer',
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

/* ============================================================
   Composer
   ============================================================ */
export interface ChatComposerProps {
  placeholder?: string;
  value?: string;
  /** default · focus (viền gold + ring) · disabled */
  state?: 'default' | 'focus' | 'disabled';
  /** Nút phụ bên phải ô nhập */
  actions?: ('attach' | 'emoji' | 'mic')[];
  /** Nút "+" bên trái (bố cục full screen) */
  leadingPlus?: boolean;
  onChange?: (value: string) => void;
  onSend?: (value: string) => void;
}

export function ChatComposer({
  placeholder = 'Nhập tin nhắn...',
  value,
  state = 'default',
  actions = ['attach', 'emoji'],
  leadingPlus = false,
  onChange,
  onSend,
}: ChatComposerProps) {
  const disabled = state === 'disabled';
  const focused = state === 'focus';
  const ACTION_ICON = { attach: Icon.paperclip, emoji: Icon.smile, mic: Icon.mic };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: leadingPlus ? '6px 6px 6px 12px' : '6px 6px 6px 14px',
      borderRadius: 'var(--radius-pill)',
      border: `1.5px solid ${focused ? 'var(--brand-gold)' : 'var(--border-default)'}`,
      boxShadow: focused ? 'var(--shadow-focus)' : undefined,
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
    }}>
      {leadingPlus && <span style={{ color: 'var(--text-tertiary)', display: 'flex' }}><Icon.plus size={20} /></span>}
      <input
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && !disabled) onSend?.(e.currentTarget.value); }}
        style={{
          flex: 1,
          minWidth: 0,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontFamily: FONT,
          fontSize: 'var(--fs-body-sm)',
          color: disabled ? 'var(--text-disabled)' : 'var(--text-primary)',
        }}
      />
      {!disabled && actions.map((a) => {
        const A = ACTION_ICON[a];
        return <span key={a} style={{ color: 'var(--text-tertiary)', display: 'flex', cursor: 'pointer' }}><A size={20} /></span>;
      })}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSend?.(value ?? '')}
        style={{
          width: 36,
          height: 36,
          flex: 'none',
          borderRadius: 'var(--radius-pill)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: disabled ? 'var(--neutral-200)' : 'var(--brand-gold)',
          color: disabled ? 'var(--text-disabled)' : 'var(--navy-900)',
          cursor: disabled ? 'default' : 'pointer',
        }}
      >
        <Icon.send size={17} />
      </button>
    </div>
  );
}

/* ============================================================
   Header hội thoại
   ============================================================ */
export interface ChatHeaderProps {
  name?: string;
  /** Dòng trạng thái dưới tên */
  status?: string;
  /** navy = header widget · plain = full screen / mobile */
  variant?: 'navy' | 'plain';
  /** Hiện nút quay lại (mobile) */
  back?: boolean;
  /** Nút thu nhỏ + đóng (widget) */
  windowActions?: boolean;
  avatar?: React.ReactNode;
  onBack?: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
}

export function ChatHeader({
  name = 'TIXIMAX Hỗ trợ',
  status = 'Đang trực tuyến',
  variant = 'plain',
  back = false,
  windowActions = false,
  avatar,
  onBack,
  onClose,
  onMinimize,
}: ChatHeaderProps) {
  const navy = variant === 'navy';
  const iconBtn: React.CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: 'var(--radius-sm)',
    border: navy ? 'none' : '1px solid var(--border-default)',
    background: navy ? 'transparent' : 'var(--surface-card)',
    // Band navy giữ nguyên ở dark → ghim trắng, không dùng --text-inverse (đảo theo theme)
    color: navy ? 'var(--neutral-0)' : 'var(--text-tertiary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 16px',
      fontFamily: FONT,
      background: navy ? 'var(--surface-navy)' : 'var(--surface-card)',
      color: navy ? 'var(--neutral-0)' : 'var(--text-primary)',
      borderBottom: navy ? 'none' : '1px solid var(--border-subtle)',
    }}>
      {back && (
        <button type="button" onClick={onBack} style={{ ...iconBtn, border: 'none', background: 'transparent', color: 'inherit' }}>
          <Icon.chevronLeft size={22} />
        </button>
      )}
      {avatar ?? <ChatAvatar size={36} online />}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 700 }}>{name}</div>
        <div style={{
          fontSize: 11.5,
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          color: navy ? 'rgba(255,255,255,.75)' : 'var(--text-success)',
        }}>
          {!navy && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green-400)' }} />}
          {status}
        </div>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
        {windowActions ? (
          <>
            <button type="button" onClick={onMinimize} style={iconBtn}><Icon.minus size={16} /></button>
            <button type="button" onClick={onClose} style={iconBtn}><Icon.x size={16} /></button>
          </>
        ) : (
          <>
            <button type="button" style={iconBtn}><Icon.search size={16} /></button>
            <button type="button" style={iconBtn}><Icon.info size={16} /></button>
            <button type="button" style={iconBtn}><Icon.more size={16} /></button>
          </>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Launcher (FAB) + teaser
   ============================================================ */
export interface ChatLauncherProps {
  /** Số tin chưa đọc — 0 thì ẩn badge */
  unread?: number;
  /** Bong bóng mời chat phía trên FAB */
  teaser?: React.ReactNode;
  onClick?: () => void;
  onDismissTeaser?: () => void;
}

export function ChatLauncher({ unread = 0, teaser, onClick, onDismissTeaser }: ChatLauncherProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, fontFamily: FONT }}>
      {teaser && (
        <div style={{
          position: 'relative',
          maxWidth: 230,
          padding: '12px 16px',
          background: 'var(--surface-card)',
          border: '1px solid var(--border-default)',
          borderRadius: '16px 16px 4px 16px',
          boxShadow: 'var(--shadow-lg)',
          fontSize: 13.5,
          lineHeight: 1.45,
          color: 'var(--text-primary)',
        }}>
          <button
            type="button"
            onClick={onDismissTeaser}
            style={{
              position: 'absolute',
              top: -8,
              left: -8,
              width: 20,
              height: 20,
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              background: 'var(--neutral-200)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Icon.x size={12} />
          </button>
          {teaser}
        </div>
      )}
      <button
        type="button"
        onClick={onClick}
        style={{
          position: 'relative',
          width: 56,
          height: 56,
          borderRadius: 'var(--radius-pill)',
          border: 'none',
          background: 'var(--brand-gold)',
          color: 'var(--navy-900)',
          boxShadow: 'var(--shadow-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <Icon.message size={26} />
        {unread > 0 && (
          <span style={{
            position: 'absolute',
            top: -2,
            right: -2,
            minWidth: 20,
            height: 20,
            padding: '0 5px',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--brand-red)',
            color: 'var(--neutral-0)',
            fontSize: 11,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--surface-page)',
          }}>
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}

/* ============================================================
   Panel widget (góc phải)
   ============================================================ */
export interface ChatPanelProps {
  name?: string;
  status?: string;
  /** Dòng thương hiệu dưới composer */
  brandLine?: string;
  width?: number;
  height?: number;
  /** Nội dung hội thoại */
  children?: React.ReactNode;
  /** Vùng nhập — mặc định dùng ChatComposer */
  composer?: React.ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
}

export function ChatPanel({
  name = 'TIXIMAX Hỗ trợ',
  status = 'Đang trực tuyến · phản hồi ~1 phút',
  brandLine = 'Hỗ trợ bởi TIXIMAX',
  width = 340,
  height = 480,
  children,
  composer,
  onClose,
  onMinimize,
}: ChatPanelProps) {
  return (
    <div style={{
      width,
      height,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-xl)',
      fontFamily: FONT,
    }}>
      <ChatHeader variant="navy" name={name} status={status} windowActions onClose={onClose} onMinimize={onMinimize} />
      <div style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        background: 'var(--surface-page)',
      }}>
        {children}
      </div>
      <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border-subtle)' }}>
        {composer ?? <ChatComposer />}
        {brandLine && (
          <div style={{ paddingTop: 7, textAlign: 'center', fontSize: 10, color: 'var(--text-disabled)' }}>
            {brandLine}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Danh sách hội thoại
   ============================================================ */
export interface ConversationItemProps {
  name?: string;
  /** Dòng tin nhắn gần nhất */
  snippet?: string;
  time?: string;
  /** Số tin chưa đọc */
  unread?: number;
  active?: boolean;
  online?: boolean;
  initials?: string;
  tone?: 'gold' | 'navy' | 'blue';
  onClick?: () => void;
}

export function ConversationItem({
  name = 'TIXIMAX Hỗ trợ',
  snippet = 'Đơn đang thông quan tại Nội Bài...',
  time = '09:43',
  unread = 0,
  active = false,
  online = false,
  initials = 'TX',
  tone = 'gold',
  onClick,
}: ConversationItemProps) {
  const ellipsis: React.CSSProperties = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        padding: '11px 16px',
        cursor: 'pointer',
        fontFamily: FONT,
        background: active ? 'var(--gold-50)' : 'transparent',
        boxShadow: active ? 'inset 3px 0 0 var(--brand-gold)' : undefined,
      }}
    >
      <ChatAvatar initials={initials} tone={tone} size={44} online={online} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <span style={{ ...ellipsis, fontSize: 'var(--fs-body-sm)', fontWeight: 700, color: 'var(--text-primary)' }}>{name}</span>
          <span style={{ flex: 'none', fontSize: 11, color: 'var(--text-tertiary)' }}>{time}</span>
        </div>
        <div style={{
          ...ellipsis,
          marginTop: 2,
          fontSize: 12.5,
          color: unread > 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
          fontWeight: unread > 0 ? 600 : 400,
        }}>
          {snippet}
        </div>
      </div>
      {unread > 0 && (
        <span style={{
          flex: 'none',
          minWidth: 18,
          height: 18,
          padding: '0 5px',
          borderRadius: 'var(--radius-pill)',
          background: 'var(--brand-red)',
          color: 'var(--neutral-0)',
          fontSize: 10.5,
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {unread}
        </span>
      )}
    </div>
  );
}

export interface ConversationListProps {
  title?: string;
  /** Placeholder ô tìm kiếm — bỏ trống thì ẩn ô tìm */
  searchPlaceholder?: string;
  width?: number;
  children?: React.ReactNode;
}

export function ConversationList({
  title = 'Tin nhắn',
  searchPlaceholder = 'Tìm hội thoại...',
  width = 300,
  children,
}: ConversationListProps) {
  return (
    <div style={{
      width,
      flex: 'none',
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      fontFamily: FONT,
      borderRight: '1px solid var(--border-subtle)',
      background: 'var(--surface-card)',
    }}>
      <div style={{ padding: '16px 16px 12px' }}>
        {title && (
          <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>{title}</div>
        )}
        {searchPlaceholder && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 12px',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--surface-sunken)',
            fontSize: 'var(--fs-caption)',
            color: 'var(--text-tertiary)',
          }}>
            <Icon.search size={15} />{searchPlaceholder}
          </div>
        )}
      </div>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>{children}</div>
    </div>
  );
}
