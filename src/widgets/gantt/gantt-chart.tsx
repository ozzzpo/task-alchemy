import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Task } from '@/shared/types/task.type';

const GanttChart = ({ tasks }: { tasks: Task[] }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // очищаем svg перед каждым рендером

    // Определение размеров
    const width = 1100;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 20, left: 200 };

    // Настройка локализации для русского языка
    const russianLocale = d3.timeFormatLocale({
      dateTime: '%A, %e %B %Y г. %X',
      date: '%d.%m.%Y',
      time: '%H:%M:%S',
      periods: ['AM', 'PM'],
      days: [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
      ],
      shortDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      shortMonths: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
      ],
    });

    const russianDateFormat = russianLocale.format('%d %b %Y');

    // Настройки временной шкалы
    const xScale = d3
      .scaleTime()
      .domain([
        d3.min(tasks, (d) => new Date(d.startDate))!,
        d3.max(tasks, (d) => new Date(d.endDate))!,
      ])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleBand()
      .domain(tasks.map((d) => d.title))
      .range([margin.top, height - margin.bottom])
      .padding(0.2);

    // Создаем оси
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(d3.timeDay.every(5))
      // @ts-expect-error так надо
      .tickFormat(russianDateFormat);

    const yAxis = d3.axisLeft(yScale);

    // Добавляем ось X
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      // @ts-expect-error так надо
      .call(xAxis)
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('font-size', '12px') // Изменение размера текста
      .style('font-family', 'TTTravels')
      .style('text-anchor', 'end');

    // Добавляем ось Y
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .style('font-size', '12px') // Изменение размера текста
      .style('font-family', 'TTTravels')
      .call(yAxis);

    // Отрисовка задач в виде прямоугольников
    svg
      .selectAll('rect')
      .data(tasks)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(new Date(d.startDate)))
      .attr('y', (d) => yScale(d.title)!)
      .attr(
        'width',
        (d) => xScale(new Date(d.endDate)) - xScale(new Date(d.startDate))
      )
      .attr('height', yScale.bandwidth())
      .attr('fill', (d) => (d.completed ? 'lightgray' : 'steelblue'));

    // Добавляем текст внутри задач
    svg
      .selectAll('text.task-title')
      .data(tasks)
      .enter()
      .append('text')
      .attr('x', (d) => xScale(new Date(d.startDate)) + 5)
      .attr('y', (d) => yScale(d.title)! + yScale.bandwidth() / 2 + 5)
      .text((d) => d.title)
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .attr('font-weight', 'medium');
  }, [tasks]);

  return <svg className="w-full" ref={svgRef} width={700} height={500}></svg>;
};

export default GanttChart;
