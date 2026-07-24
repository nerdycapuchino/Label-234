#!/bin/bash
# Label 234 VPS doctor — diagnose + safely fix.
# Read-only by default. Fixes only the nginx duplicate server_name, with backup
# + rollback. Does NOT touch databases, other apps, or remove anything malware-
# related (that needs human review). Run as root:  sudo bash vps-doctor.sh
set -uo pipefail

line() { printf '\n========== %s ==========\n' "$1"; }

line "SYSTEM"
uptime
echo "--- last reboots ---"; last -x reboot shutdown 2>/dev/null | head -6

line "TOP CPU / MEM PROCESSES"
ps -eo pid,ppid,user,%cpu,%mem,etime,cmd --sort=-%cpu | head -12

line "OUTBOUND ESTABLISHED CONNECTIONS (malware check)"
ss -tunp state established 2>/dev/null | head -30 || netstat -tunp 2>/dev/null | head -30

line "LISTENING PORTS"
ss -ltnp 2>/dev/null | awk 'NR==1 || /:(3000|3001|3002|1337|80|443|5432|3306)/'

line "CRON JOBS (all users) — common malware persistence"
for u in $(cut -f1 -d: /etc/passwd); do
  c=$(crontab -l -u "$u" 2>/dev/null)
  [ -n "$c" ] && echo "### $u:" && echo "$c"
done
echo "--- /etc/cron.d, /etc/crontab ---"
cat /etc/crontab 2>/dev/null; ls -la /etc/cron.d 2>/dev/null

line "SUSPICIOUS EXECUTABLES in tmp dirs"
for d in /tmp /var/tmp /dev/shm; do
  find "$d" -maxdepth 2 -type f -executable 2>/dev/null
done
echo "(empty above = good)"

line "RECENTLY MODIFIED systemd services (last 7 days)"
find /etc/systemd/system /lib/systemd/system -name '*.service' -mtime -7 2>/dev/null

line "SERVICES STATUS"
for s in nginx mariadb mysql ssh sshd postgresql; do
  systemctl is-active "$s" 2>/dev/null | sed "s/^/$s: /"
done

line "PM2 PROCESSES"
pm2 ls 2>/dev/null || echo "pm2 not found / no procs"

line "NGINX: duplicate server_name scan"
CONF_DIR=/etc/nginx
echo "--- enabled sites ---"; ls -la $CONF_DIR/sites-enabled 2>/dev/null
echo "--- files declaring 'server_name 234label.com' ---"
grep -rlE 'server_name[^;]*\b234label\.com\b' $CONF_DIR 2>/dev/null
echo "--- nginx config test ---"
nginx -t 2>&1

line "NGINX: warnings from journal (server_name conflicts, etc.)"
journalctl -u nginx --no-pager 2>/dev/null | grep -iE 'conflicting|duplicate|warn' | tail -10

line "SSH-AGENT errors from journal"
journalctl --no-pager 2>/dev/null | grep -i 'ssh-agent' | tail -10

line "KERNEL / OOM / crash hints (last 40 lines dmesg)"
dmesg 2>/dev/null | tail -40 | grep -iE 'oom|killed|error|fail|segfault' || echo "no obvious kernel errors"

line "DONE"
echo "Read-only scan complete. No changes were made."
echo "Paste this whole output back to review the nginx duplicate + any malware signs."
