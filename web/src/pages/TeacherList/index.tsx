import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';


import './styles.css';
import api from '../../services/api';


function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function  searchTeachers(e: FormEvent) {

    e.preventDefault();


    const response = await api.get('/classes',{
      params: {subject, week_day, time}
    })

    setTeachers(response.data);

  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form action="" id="search-teachers" onSubmit={searchTeachers}>
          <Select 
            name="subject" 
            label="Matéria"
            value={subject}
            onChange={e => {setSubject(e.target.value)}}
            options={[
              { id: 'Artes', label: 'Artes'},
              { id: 'Biologia', label: 'Biologia'},
              { id: 'Ciências', label: 'Ciências'},
              { id: 'Física', label: 'Física'},
              { id: 'Química', label: 'Química'},
              { id: 'Matemática', label: 'Matemática'},
              { id: 'Português', label: 'Português'},
            ]}
          />
           <Select 
            name="week_day" 
            label="Dia da semana"
            value={week_day}
            onChange={e => {setWeekDay(e.target.value)}}
            options={[
              { id: '0', label: 'Domingo'},
              { id: '1', label: 'Segunda-feira'},
              { id: '2', label: 'Terça-feira'},
              { id: '3', label: 'Quarta-feira'},
              { id: '4', label: 'Quinta-feira'},
              { id: '5', label: 'Sexta-feira'},
              { id: '6', label: 'Sábado'},
            ]}
          />         
          <Input 
            type="time" 
            name="time" 
            label="Hora" 
            value={time}
            onChange={e => {
              setTime(e.target.value)}}
            
          />

          <button type="submit">Buscar</button>
            
        </form>
        
      </PageHeader>

      <main>
        {teachers.map((teacher:Teacher) => {
          return(
            <TeacherItem key={teacher.id} classes={teacher}/>
          )
        })}
        
       
      </main>
    </div>
  )
}

export default TeacherList;