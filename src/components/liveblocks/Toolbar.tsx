'use client';

import { NewThread } from '@/components/liveblocks/NewThread';
import { Sidebar } from '@/components/liveblocks/Sidebar';
import { ToolbarAvatars } from '@/components/liveblocks/ToolbarAvatars';
import { PlusIcon } from '@/components/liveblocks/icons/PlusIcon';
import { SidebarIcon } from '@/components/liveblocks/icons/SidebarIcon';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useState } from 'react';
import { Button } from './Button';
import sidebarStyles from './Sidebar.module.css';
import styles from './Toolbar.module.css';

export function Toolbar({ ...props }) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      {...props}
      data-hide-cursors
    >
      <div className={styles.toolbar}>
        <div className={styles.toolbarActions}>
          <NewThread>
            <Button variant="ghost" square>
              <PlusIcon width={12} height={12} />
            </Button>
          </NewThread>
        </div>
        <div className={styles.toolbarSeparator} />
        <ToolbarAvatars />
        <div className={styles.toolbarSeparator} />
        <div className={styles.toolbarActions}>
          <Collapsible.Trigger asChild>
            <Button variant="ghost" square>
              <SidebarIcon
                style={{ opacity: open ? '0.7' : '1' }}
                width={12}
                height={12}
              />
            </Button>
          </Collapsible.Trigger>
        </div>
      </div>
      <Collapsible.Content className={sidebarStyles.sidebar}>
        <Sidebar onClose={() => setOpen(false)} />
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
